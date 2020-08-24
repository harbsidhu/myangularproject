import { Component, ElementRef, HostListener,Output,EventEmitter, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { ResourceListingService } from '../../_services/resourceListing.service';
import { ChatMessage } from '../../_models/chatMessage';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import * as moment from 'moment';

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom', {static: false}) bottom: ElementRef
  @Input() public chatTitle: string;
  @Input() public listingId: number;
  @Input() public fromId: number;
  @Input() public toId: number;
  @Input() public isDocked: boolean;
  @Input() public popupChart: boolean;
  @Output() public onChatClose = new EventEmitter();
  
  public _visible = this.popupChart
  public chatMessages: Array<ChatMessage>;
  public _user: User;

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible;

    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  };

  constructor(
    private resourceListingService: ResourceListingService,
    private storageService: StorageService){}
 

  public focus = new Subject()

  public messages = []

  public addMessage(message: ChatMessage) {

var moment = require('moment-timezone');

 var datei = moment.utc(message.timeStamp).utcOffset(+10);

    this.messages.unshift({
      from : message.fromId,
      text : message.message,
      type : message.fromId == this._user.id ? 'sent' : 'received',
     date :moment.tz(datei, "Australia/Melbourne").format()
    })   
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {       
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.getChatMessages(Number(this.listingId), this.toId);
    this.scrollToBottom()
    setTimeout(() => this.visible = true, 1000);
  }

  getChatMessages(listingId: number, toId: number) {
    this.resourceListingService.getChatMessages(listingId,toId)
      .subscribe(res => {       
        this.chatMessages = res;
        this.chatMessages.sort((a,b) => a.timeStamp > b.timeStamp ? 1 : -1)
        .map(m => this.addMessage(m));            
      });
  }

  pushChatMessage(chatMessage: ChatMessage){
    this.resourceListingService.pushChatMessage(chatMessage)
    .subscribe( res => {
      this.resourceListingService.getChatMessages(this.listingId, this.toId)
      .subscribe(result => {       
        var chats: Array<ChatMessage> = result;
      
        var newMessages = chats.filter(this.difference(this.chatMessages)).sort((a,b) => a.timeStamp > b.timeStamp ? 1 : -1);

        newMessages.map(m => {this.addMessage(m); this.chatMessages.push(m);});  
         
        this.scrollToBottom()          
      });
    }
    );
  }

  difference(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.message == current.message && other.toId == current.toId && other.fromId == current.fromId && other.timeStamp == current.timeStamp
      }).length == 0;
    }
  }

  
  toggleChat() {
    if (this.isDocked){
      this.visible = !this.visible;      
    } 
    else {
      this.onChatClose.emit({});
    }
  }

  public refreshChat()
  {
    this.resourceListingService.getChatMessages(this.listingId, this.toId)
    .subscribe(result => {       
      var chats: Array<ChatMessage> = result;
      var newMessages = chats.filter(this.difference(this.chatMessages)).sort((a,b) => a.timeStamp > b.timeStamp ? 1 : -1);
      
      newMessages.map(m => {this.addMessage(m); this.chatMessages.push(m);});  
         
    });
    this.scrollToBottom();
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }

    var newMessage : ChatMessage = {
      resourceListingId: this.listingId,
      fromId : this.fromId,
      toId: this.toId,
      message,
      timeStamp: new Date
    }
    this.pushChatMessage(newMessage);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}
