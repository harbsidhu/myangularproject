import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-camera-dialog',
    templateUrl: './camera-dialog.component.html',
    styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent implements AfterViewInit, OnDestroy {

    @Input() title: string;
    @ViewChild('stream', { static: true }) stream: ElementRef;
    @ViewChild('capture', { static: true }) capture: ElementRef;
    @ViewChild('snapshot', { static: true }) snapshot: ElementRef;

    cameraStream = null;
    isCaptured: boolean;
    cameras = [];
    selectedCamera;
    resultFile;

    constructor(protected ref: NbDialogRef<CameraDialogComponent>) { }

    dismiss() {
        this.ref.close();
    }

    ok = () => {
        this.ref.close(this.resultFile);
    }

    ngAfterViewInit() {
        this.getDevices();
    }

    startStreaming = (constraints?) => {
        this.isCaptured = false;
        const mediaSupport = 'mediaDevices' in navigator;
        if (mediaSupport && null == this.cameraStream) {
            navigator.mediaDevices.getUserMedia(constraints ? constraints : { video: true }).then(mediaStream => {
                this.stream.nativeElement.srcObject = mediaStream;
                this.stream.nativeElement.play();
                this.cameraStream = mediaStream;
            }).catch(err => {
                alert('Unable to access camera');
            });
        } else {
            alert('Your browser does not support media devices.');
            return;
        }
    }

    captureSnapshot = () => {
        if (this.isCaptured) {
            this.isCaptured = false;
            return;
        }
        if (null != this.cameraStream) {

            const ctx = this.capture.nativeElement.getContext('2d');
            const img = new Image();

            ctx.drawImage(this.stream.nativeElement, 0, 0, this.capture.nativeElement.width, this.capture.nativeElement.height);

            img.src = this.capture.nativeElement.toDataURL("image/jpg");
            img.width = this.stream.nativeElement.width;

            this.snapshot.nativeElement.innerHTML = '';

            this.snapshot.nativeElement.appendChild(img);
            this.isCaptured = true;
            this.resultFile = this.convertImagetoFile(img.src, 'Capture.jpg');
        }
    }

    convertImagetoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    getDevices() {
        navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
            this.cameras = deviceInfos.filter(device => device.kind === 'videoinput');
            if (this.cameras.length > 0) {
                this.selectedCamera = this.cameras[0].deviceId;
                const constraints = {
                    video: { deviceId: this.cameras[0].deviceId ? this.cameras[0].deviceId : undefined },
                };
                this.startStreaming(constraints);
            }
        });
    }

    changeCamera(camera) {
        const constraints = {
            video: { deviceId: camera },
        };
        this.stopCamera();
        this.startStreaming(constraints);
    }

    stopCamera = () => {
        if (null != this.cameraStream) {
            const track = this.cameraStream.getTracks()[0];
            track.stop();
            this.stream.nativeElement.load();
            this.cameraStream = null;
        }
    }

    ngOnDestroy() {
        this.stopCamera();
    }
}
