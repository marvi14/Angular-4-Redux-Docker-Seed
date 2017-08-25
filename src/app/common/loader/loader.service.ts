import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader';
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoaderService {

	private loaderSubject = new Subject<LoaderState>();

	constructor() { }

	public show() {
		this.loaderSubject.next(<LoaderState>{ show: true });
	}

	public hide() {
		this.loaderSubject.next(<LoaderState>{ show: false });
	}

	public getLoaderState(): Observable<any>{
		return this.loaderSubject.asObservable();
	}
}