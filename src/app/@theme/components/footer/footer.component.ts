import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  navigateToContactUs() {
    this.router.navigate(['home/contactus']);
  }
}

// <div id='container'>
//   <div id='num1'>
//     <label>About</label> <label>Privacy</label> <label>Contact</label> <label>Help</label>
//     <span class="created-by">by <b><a href="http://sarjandesai.com" target="_blank">Mitocon</a></b> 2019</span>
//     <div class="socials">
//       <!-- <a href="#" target="_blank" class="ion ion-social-github"></a>-->
//       <a href="#" target="_blank" class="ion ion-social-facebook"></a>
//       <a href="#" target="_blank" class="ion ion-social-twitter"></a>
//       <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
//     </div>
//   </div>
//   <div id='num2'>
//   <label>ASPIRE is a treadmark of Advisory System for Process
//   Innovation and ASPIRE is trademark of advisory System for Process
//   Innovation and Resource Exchange Pty Ltd ABN47 632 061 164 </label>
//   </div>
// </div>



// <!-- <div class="row">
// <div class="col">
//   <label>About</label> <label>Privacy</label> <label>Contact</label> <label>Help</label>
//   <span class="created-by">by <b><a href="http://sarjandesai.com" target="_blank">Mitocon</a></b> 2019</span>
//   <div class="socials">
//     <!-- <a href="#" target="_blank" class="ion ion-social-github"></a>-->
//     <a href="#" target="_blank" class="ion ion-social-facebook"></a>
//     <a href="#" target="_blank" class="ion ion-social-twitter"></a>
//     <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
//   </div>
// </div>
// </div>
// <br/>
// <div class="row">
// <div class="col">
// <label>ASPIRE is a treadmark of Advisory System for Process
// Innovation and ASPIRE is trademark of advisory System for Process
// Innovation and Resource Exchange Pty Ltd ABN47 632 061 164 </label>
// </div>
// </div> -->
