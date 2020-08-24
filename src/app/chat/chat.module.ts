import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { NbCardModule, NbIconModule, NbButtonModule, NbSidebarModule, NbCheckboxModule,
  NbRadioModule,NbSelectModule, NbTooltipModule, NbListModule } from '@nebular/theme';
  
@NgModule({
  imports: [CommonModule, NbIconModule],
  declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent],
  exports: [ChatWidgetComponent],
  entryComponents: [ChatWidgetComponent],
})
export class ChatModule {}
