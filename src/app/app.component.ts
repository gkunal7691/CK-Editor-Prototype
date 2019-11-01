import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './upload-adapter';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public Editor = ClassicEditor;
  public form;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.fb.group({
        data: this.fb.control('', [])
    });
  }

  onReady(editor): any {

      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new UploadAdapter(loader, editor);
      };
  }
}
