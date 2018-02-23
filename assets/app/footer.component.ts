import {Component} from "@angular/core";

@Component({
    selector: 'app-footer',
    styles: [`
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            padding-bottom: 10px;
        }

        @media (max-width: 768px) {
            .footer div[class^="col"] {
                width: 100%;
                text-align: center;
            }
        }
    `],
    template: `
        <footer class="container-fluid">
            <div class="row footer border-top">
                <div class="col-sm-5 col-sm-offset-1 text-sm-center">
                    <a href="#">Despre noi | </a>
                    <a href="#">Contact |</a>
                    <a href="#">Ajutor</a>
                </div>

                <div class="col-sm-2 col-sm-offset-4 ">
                    <a href="#"><i class="fa fa-facebook-official icon-md"></i></a>
                    <a href="#"><i class="fa fa-twitter-square icon-md"></i></a>
                </div>
            </div>
        </footer>
    `
})
export class FooterComponent {

}