import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent {

  className = "dark-mode";
  toggleTheme(isDarkMode: boolean) {
    this.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  startQuiz() {
    this.router.navigate(['/questions'], { relativeTo: this.route });
  }
}
