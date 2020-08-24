import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'chat-input',
  template: `
  <div class="input-div">
  <textarea type="text" class="chat-input-text" placeholder="Type message..."
  #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>


              </div>
              <div class="button-div">
              <button type="submit" class="chat-input-submit" (click)="onSubmit()">
              <nb-icon
              class ="icon"
              icon="paper-plane"
              status="primary"
              pack="regular"
          >
          </nb-icon>
              </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎'
  @Input() public focus = new EventEmitter()
  @Output() public send = new EventEmitter()
  @Output() public dismiss = new EventEmitter()
  @ViewChild('message', {static: false}) message: ElementRef

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage())

  }

  public focusMessage() {
    this.message.nativeElement.focus()
  }

  public getMessage() {
    return this.message.nativeElement.value
  }

  public clearMessage() {
    this.message.nativeElement.value = ''
  }

  onSubmit() {
    const message = this.getMessage()
    if (message.trim() === '') {
      return
    }

    this.send.emit({ message })
    this.clearMessage()
    this.focusMessage()
  }

}
