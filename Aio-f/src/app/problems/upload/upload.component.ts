import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

const BASE_URL = 'http://127.0.0.1:3000'

@Component({
	selector: 'app-problems-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

	@Output() uploadEvent = new EventEmitter<string>();
	@ViewChild('templateInput', { static: true }) templateInput: ElementRef;
	@ViewChild('spjInput', { static: true }) spjInput: ElementRef;
	@ViewChild('dataInput', { static: true }) dataInput: ElementRef;

	template: FileUploader;
	spj: FileUploader;
	data: FileUploader;
	token: string;

	constructor (private http: HttpClient){
		this.token = '';

		this.template = new FileUploader({
			url: BASE_URL + '/problems/upload_template',
			itemAlias: 'template',
		});
		this.template.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}
		this.template.onBuildItemForm = (fileItem: any, form: any) => {
			form.append('token' , this.token);
		};
		this.template.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
			console.log(response);
			if (status == 200) {
				this.token = response;
			}
		};
		this.template.onAfterAddingFile = () => {
			this.templateInput.nativeElement.value = '';
		}

		this.spj = new FileUploader({
			url: BASE_URL + '/problems/upload_spj',
			itemAlias: 'spj',
		});
		this.spj.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}
		this.spj.onBuildItemForm = (fileItem: any, form: any) => {
			form.append('token' , this.token);
		};
		this.spj.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
			if (status == 200) {
				this.token = response;
			}
		};
		this.spj.onAfterAddingFile = () => {
			this.spjInput.nativeElement.value = '';
		}

		this.data = new FileUploader({
			url: BASE_URL + '/problems/upload_data',
			itemAlias: 'data',
		});
		this.data.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}
		this.data.onBuildItemForm = (fileItem: any, form: any) => {
			form.append('token' , this.token);
		};
		this.data.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
			if (status == 200) {
				this.token = response;
				this.uploadEvent.emit(this.token);
			}
		};
		this.data.onAfterAddingFile = () => {
			this.dataInput.nativeElement.value = '';
		}
	}

	onTemplateChange() {
		if (this.template.queue.length != 1){
			this.template.removeFromQueue(this.template.queue[0]);
		}
	}
	onTemplateRemove() {
		if (this.template.queue[0].isUploaded){
			let url = BASE_URL + '/problems/delete_template';
			this.http.post<any>(url, { token: this.token })
				.subscribe( data => {
					console.log(data);
				}
			)
		} else {

		}
		this.template.queue[0].remove();
	}

	onSpjChange() {
		if (this.spj.queue.length != 1){
			this.spj.removeFromQueue(this.spj.queue[0]);
		}
	}
	onSpjRemove() {
		if (this.spj.queue[0].isUploaded){
			let url = BASE_URL + '/problems/delete_spj';
			this.http.post<any>(url, { token: this.token })
				.subscribe( data => {
					console.log(data);
				}
			)
		} else {

		}
		this.spj.queue[0].remove();
	}

	onDataChange() {
		if (this.data.queue.length != 1){
			this.data.removeFromQueue(this.data.queue[0]);
		}
	}
	onDataRemove() {
		if (this.data.queue[0].isUploaded){
			let url = BASE_URL + '/problems/delete_data';
			this.http.post<any>(url, { token: this.token })
				.subscribe( data => {
					console.log(data);
				}
			)
		} else {

		}

		this.data.queue[0].remove();
	}

	ngOnInit(): void {

	}
}
