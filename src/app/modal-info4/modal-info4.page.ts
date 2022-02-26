import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { File, IWriteOptions } from '@ionic-native/file/ngx'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-modal-info4',
  templateUrl: './modal-info4.page.html',
  styleUrls: ['./modal-info4.page.scss'],
})
export class ModalInfo4Page implements OnInit {

  constructor(private modalctrl: ModalController, private file: File, private fileOpener: FileOpener, private emailComposer: EmailComposer) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalctrl.dismiss();
  }

  createPDF(){
    
    const pdfBlock = document.getElementById("PrintInvoice");
    
    const options = { 
      background: "white", 
      height: pdfBlock.clientWidth, 
      width: pdfBlock.clientHeight 
    };

    domtoimage.toPng(pdfBlock, options).then((fileUrl) => {
      var doc = new JSPDF("p","px","a4");
      doc.addImage(fileUrl, 'PDF', 10, 10, 0, 0);
  
      let docRes = doc.output();
      let buffer = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }
  
  
      const directory = this.file.dataDirectory;
      const fileName = "user-data.pdf";

      let options: IWriteOptions = { 
        replace: true 
      };
  
      this.file.checkFile(directory, fileName).then((res)=> {
        this.file.writeFile(directory, fileName,buffer, options)
        .then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is exported'))
            .catch(e => console.log(e));
        }).catch((error)=> {
          console.log(JSON.stringify(error));
        });
      }).catch((error)=> {
        this.file.writeFile(directory,fileName,buffer).then((res)=> {
          console.log("File generated" + JSON.stringify(res));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File exported'))
            .catch(e => console.log(e));
        })
        .catch((error)=> {
          console.log(JSON.stringify(error));
        });
      });
    }).catch(function (error) {
      console.error(error);
    });
    
  }

  enviarEmail()
  {
    let email = {
      to: 'juanma_290590@hotmail.com',
      attachments: [
        'file:///data/user/0/io.ionic.starter/files/user-data.pdf'
      ],
      subject: 'Pedido',
      body: 'Informe del ultimo pedido',
      isHtml: true
    };
      this.emailComposer.open(email);
  }
}

