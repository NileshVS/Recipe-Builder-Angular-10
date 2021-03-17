import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) { }
    ngOnInit() {

    }

    onSwitchLoading() {
        this.isLoading = !this.isLoading;
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.onSwitchLoading()
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {

        }
        else {
            this.authService.signup(email, password).subscribe(res => {
                console.log(res);
                this.onSwitchLoading()
            },
                errMsg => {
                    this.error = errMsg
                    this.onSwitchLoading()
                })
        }

        form.reset()
    }
}