import {Component} from '@angular/core';
import {AbstractHtmlTextareaFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'nc-html-textarea-field',
  templateUrl: './html-textarea-field.component.html',
  styleUrls: ['./html-textarea-field.component.scss']
})
export class HtmlTextareaFieldComponent extends AbstractHtmlTextareaFieldComponent {
    public quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered'}, { list: 'bullet' }],
            [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
            [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent

            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    constructor(protected _translate: TranslateService, private sanitizer: DomSanitizer) {
        super(_translate);
        // sanitizer.bypassSecurityTrustHtml(this.textAreaField.value);
        // sanitizer.bypassSecurityTrustStyle(this.textAreaField.value);
    }
}
