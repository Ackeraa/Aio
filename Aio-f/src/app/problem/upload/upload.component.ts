import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { ProblemService } from '../problem.service';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
  selector: 'app-problem-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @ViewChild('templateInput', { static: true }) templateInput: ElementRef;
  @ViewChild('spjInput', { static: true }) spjInput: ElementRef;
  @ViewChild('dataInput', { static: true }) dataInput: ElementRef;

  template: FileUploader;
  spj: FileUploader;
  data: FileUploader;
  id: string;

  constructor(
    private http: HttpClient,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.template = new FileUploader({
      url: BASE_URL + '/problems/upload_template',
      itemAlias: 'template',
    });
    this.template.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.template.onAfterAddingFile = () => {
      this.templateInput.nativeElement.value = '';
    };

    this.spj = new FileUploader({
      url: BASE_URL + '/problems/upload_spj',
      itemAlias: 'spj',
    });
    this.spj.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.spj.onAfterAddingFile = () => {
      this.spjInput.nativeElement.value = '';
    };

    this.data = new FileUploader({
      url: BASE_URL + '/problems/upload_data',
      itemAlias: 'data',
    });
    this.data.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.data.onAfterAddingFile = () => {
      this.dataInput.nativeElement.value = '';
    };

    let id = this.problemService.id;
    this.template.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', id);
    };
    this.spj.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', id);
    };
    this.data.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', id);
    };
  }

  onTemplateChange() {
    if (this.template.queue.length != 1) {
      this.template.removeFromQueue(this.template.queue[0]);
    }
  }
  onTemplateRemove() {
    if (this.template.queue[0].isUploaded) {
      this.problemService.deleteDatas('template');
    } else {
    }
    this.template.queue[0].remove();
  }

  onSpjChange() {
    if (this.spj.queue.length != 1) {
      this.spj.removeFromQueue(this.spj.queue[0]);
    }
  }

  onSpjRemove() {
    if (this.spj.queue[0].isUploaded) {
      this.problemService.deleteDatas('spj');
    } else {
    }
    this.spj.queue[0].remove();
  }

  onDataChange() {
    if (this.data.queue.length != 1) {
      this.data.removeFromQueue(this.data.queue[0]);
    }
  }

  onDataRemove() {
    if (this.data.queue[0].isUploaded) {
      this.problemService.deleteDatas('data');
    } else {
    }
    this.data.queue[0].remove();
  }
}
