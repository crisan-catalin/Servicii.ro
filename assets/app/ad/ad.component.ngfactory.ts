/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/router';
import * as i3 from './ad.component';
import * as i4 from './ad.service';
import * as i5 from '../image.service';
const styles_AdComponent:any[] = ['img[_ngcontent-%COMP%] {\n            height: 150px;\n            width: 150px;\n            object-fit: contain;\n        }\n\n        .border-bottom-sm[_ngcontent-%COMP%] {\n            border-bottom: 1px solid dimgrey;\n        }\n\n        #request-image[_ngcontent-%COMP%] {\n            margin-left: 20px;\n        }\n\n        #request-title[_ngcontent-%COMP%] {\n            margin-top: 0px;\n        }\n\n        #request-container[_ngcontent-%COMP%] {\n            margin-left: 1.33333333%;\n        }\n\n        #request-information[_ngcontent-%COMP%] {\n            font-size: 12px;\n            margin-bottom: 0px;\n        }\n\n        #request-time-and-distance[_ngcontent-%COMP%] {\n            padding-top: 10px;\n        }\n\n        .center-element[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            height: 100px;\n        }\n\n        .center-element[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n            border-radius: 0px;\n            border: 1px solid black;\n        }'];
export const RenderType_AdComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:0,styles:styles_AdComponent,
    data:{}});
function View_AdComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),3,'div',[['class',
      'col-sm-1 hidden-xs']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n                        '])),
      (_l()(),i0.ɵeld(2,0,(null as any),(null as any),0,'span',[['class','divider-vertical-sm']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    ']))],(null as any),
      (null as any));
}
function View_AdComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),6,'div',[['class',
      'col-sm-7']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                        '])),(_l()(),i0.ɵeld(2,
          0,(null as any),(null as any),3,'p',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
          ['\n                            '])),(_l()(),i0.ɵeld(4,0,(null as any),(null as any),
          0,'i',[['class','fa fa-car']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted(5,(null as any),[' ',''])),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    ']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.getDistanceText();
        _ck(_v,5,0,currVal_0);
      });
}
export function View_AdComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),59,'div',[['class',
      'row']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵeld(2,0,(null as any),
          (null as any),56,'div',[['class','col-sm-12 col-md-10 col-md-offset-1 well']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n        '])),(_l()(),i0.ɵeld(4,0,(null as any),
          (null as any),53,'div',[['class','row']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n            '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵeld(7,0,(null as any),
          (null as any),5,'div',[['class','hidden-xs col-sm-3'],['id','request-image']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                '])),(_l()(),i0.ɵeld(9,
          0,(null as any),(null as any),2,'img',[['class','img-thumbnail']],[[8,'src',
              4]],(null as any),(null as any),(null as any),(null as any))),i0.ɵdid(10,
          278528,(null as any),0,i1.NgStyle,[i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],
          {ngStyle:[0,'ngStyle']},(null as any)),i0.ɵpod(11,{'visibility':0}),(_l()(),
          i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n            '])),(_l()(),i0.ɵted(-1,(null as any),['\n            '])),
      (_l()(),i0.ɵeld(15,0,(null as any),(null as any),41,'div',[['class','col-xs-12 col-sm-8'],
          ['id','request-container']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n                '])),
      (_l()(),i0.ɵeld(17,0,(null as any),(null as any),21,'div',[['class','row border-bottom-sm']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    '])),(_l()(),i0.ɵeld(19,
          0,(null as any),(null as any),10,'div',[['class','col-sm-8']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n                        '])),(_l()(),i0.ɵeld(21,0,(null as any),
          (null as any),7,'div',[['class','caption']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
          ['\n                            '])),(_l()(),i0.ɵeld(23,0,(null as any),
          (null as any),1,'h3',[['id','request-title']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(24,(null as any),
          ['',''])),(_l()(),i0.ɵted(-1,(null as any),['\n                            '])),
      (_l()(),i0.ɵeld(26,0,(null as any),(null as any),1,'p',[['id','request-information']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(27,(null as any),['',''])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n                        '])),(_l()(),i0.ɵted(-1,(null as any),['\n                    '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    '])),(_l()(),i0.ɵeld(31,
          0,(null as any),(null as any),6,'div',[['class','col-sm-4 center-element']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                        '])),(_l()(),i0.ɵeld(33,
          0,(null as any),(null as any),3,'button',[['class','btn btn-info btn-lg']],
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,34).onClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i0.ɵdid(34,16384,(null as any),0,i2.RouterLink,
          [i2.Router,i2.ActivatedRoute,[8,(null as any)],i0.Renderer2,i0.ElementRef],
          {routerLink:[0,'routerLink']},(null as any)),i0.ɵpad(35,3),(_l()(),i0.ɵted(-1,
          (null as any),['\n                            Vezi anunt\n                        '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    '])),(_l()(),i0.ɵted(-1,
          (null as any),['\n                '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n                '])),(_l()(),i0.ɵeld(40,0,(null as any),(null as any),
          15,'div',[['class','row'],['id','request-time-and-distance']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n                    '])),(_l()(),i0.ɵeld(42,0,(null as any),
          (null as any),6,'div',[['class','col-sm-4']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
          ['\n                        '])),(_l()(),i0.ɵeld(44,0,(null as any),(null as any),
          3,'p',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n                            '])),
      (_l()(),i0.ɵeld(46,0,(null as any),(null as any),0,'i',[['class','fa fa-clock-o']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(47,(null as any),[' Expira in ','\n                        '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    '])),(_l()(),i0.ɵted(-1,
          (null as any),['\n                    '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_AdComponent_1)),i0.ɵdid(51,16384,(null as any),
          0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted(-1,(null as any),['\n                    '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_AdComponent_2)),i0.ɵdid(54,
          16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
              'ngIf']},(null as any)),(_l()(),i0.ɵted(-1,(null as any),['\n                '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵted(-1,
          (null as any),['\n']))],(_ck,_v) => {
    var _co:i3.AdComponent = _v.component;
    const currVal_1:any = _ck(_v,11,0,((_co.adImage != (undefined as any))? 'visible': 'hidden'));
    _ck(_v,10,0,currVal_1);
    const currVal_4:any = _ck(_v,35,0,'/anunturi',_co.ad.categoryName,_co.ad.id);
    _ck(_v,34,0,currVal_4);
    const currVal_6:any = _co.distance;
    _ck(_v,51,0,currVal_6);
    const currVal_7:any = _co.distance;
    _ck(_v,54,0,currVal_7);
  },(_ck,_v) => {
    var _co:i3.AdComponent = _v.component;
    const currVal_0:any = ((_co.adImage != (undefined as any))? _co.adImage: '');
    _ck(_v,9,0,currVal_0);
    const currVal_2:any = _co.ad.title;
    _ck(_v,24,0,currVal_2);
    const currVal_3:any = _co.ad.description;
    _ck(_v,27,0,currVal_3);
    const currVal_5:any = _co.getRemainingTime();
    _ck(_v,47,0,currVal_5);
  });
}
export function View_AdComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),1,'my-ad',([] as any[]),
      (null as any),(null as any),(null as any),View_AdComponent_0,RenderType_AdComponent)),
      i0.ɵdid(1,114688,(null as any),0,i3.AdComponent,[i4.AdService,i5.ImageService],
          (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const AdComponentNgFactory:i0.ComponentFactory<i3.AdComponent> = i0.ɵccf('my-ad',
    i3.AdComponent,View_AdComponent_Host_0,{ad:'ad'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovVXNlcnMvQ2F0YWxpbi9EZXNrdG9wL1Byb2llY3QgbGljZW50YS9hc3NldHMvYXBwL2FkL2FkLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9Vc2Vycy9DYXRhbGluL0Rlc2t0b3AvUHJvaWVjdCBsaWNlbnRhL2Fzc2V0cy9hcHAvYWQvYWQuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovVXNlcnMvQ2F0YWxpbi9EZXNrdG9wL1Byb2llY3QgbGljZW50YS9hc3NldHMvYXBwL2FkL2FkLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovVXNlcnMvQ2F0YWxpbi9EZXNrdG9wL1Byb2llY3QgbGljZW50YS9hc3NldHMvYXBwL2FkL2FkLmNvbXBvbmVudC50cy5BZENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTEwIGNvbC1tZC1vZmZzZXQtMSB3ZWxsXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICA8IS0tICAgICAgICAgSW1hZ2UgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWRkZW4teHMgY29sLXNtLTNcIiBpZD1cInJlcXVlc3QtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJhZEltYWdlICE9IHVuZGVmaW5lZCA/IGFkSW1hZ2UgOiAgJydcIiBbbmdTdHlsZV09XCJ7J3Zpc2liaWxpdHknOiAoYWRJbWFnZSAhPSB1bmRlZmluZWQgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9XCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImltZy10aHVtYm5haWxcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gICAgICAgICBEZXRhaWxzIC0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS04XCIgaWQ9XCJyZXF1ZXN0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBib3JkZXItYm90dG9tLXNtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLXNtLTgnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGlkPVwicmVxdWVzdC10aXRsZVwiPnt7YWQudGl0bGV9fTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBpZD1cInJlcXVlc3QtaW5mb3JtYXRpb25cIj57e2FkLmRlc2NyaXB0aW9ufX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNCBjZW50ZXItZWxlbWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIGJ0bi1sZ1wiIFtyb3V0ZXJMaW5rXT1cIlsnL2FudW50dXJpJyxhZC5jYXRlZ29yeU5hbWUsYWQuaWRdXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZXppIGFudW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJyZXF1ZXN0LXRpbWUtYW5kLWRpc3RhbmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jbG9jay1vXCI+PC9pPiBFeHBpcmEgaW4ge3tnZXRSZW1haW5pbmdUaW1lKCl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xIGhpZGRlbi14c1wiICpuZ0lmPVwiZGlzdGFuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXZpZGVyLXZlcnRpY2FsLXNtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tN1wiICpuZ0lmPVwiZGlzdGFuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhclwiPjwvaT4ge3tnZXREaXN0YW5jZVRleHQoKX19PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PiIsIjxteS1hZD48L215LWFkPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkM2Qm9CO01BQUE7TUFBQSxnQkFBaUQ7TUFDN0M7VUFBQTtNQUF5Qzs7OztvQkFFN0M7TUFBQTtNQUF1QyxrRUFDbkM7VUFBQTtVQUFBLDRDQUFHO1VBQUEscUNBQ0M7VUFBQTtVQUFBLDhCQUF5QjtNQUEwQjs7O1FBQTFCO1FBQUE7Ozs7b0JBbENyRDtNQUFBO01BQWlCLDhDQUNiO1VBQUE7VUFBQTtNQUFzRCxrREFDbEQ7VUFBQTtVQUFBLDhCQUFpQjtNQUNTLHNEQUN0QjtVQUFBO1VBQUE7TUFBbUQsMERBQy9DO1VBQUE7Y0FBQSxxRUFBQTtVQUFBO1VBQUEsOENBQWtELHNCQUN4QjtpQkFBQSx1Q0FDeEI7VUFBQSxxQkFDa0I7TUFDeEI7VUFBQTtVQUFBLGdCQUF1RDtNQUNuRDtVQUFBO01BQWtDLDhEQUM5QjtVQUFBO1VBQUEsMERBQXNCO1VBQUEsK0NBQ2xCO1VBQUE7VUFBQSw0Q0FBcUI7VUFBQSxxQ0FDakI7VUFBQTtVQUFBLDRDQUF1QjtVQUFBLFVBQWlCO01BQ3hDO1VBQUE7TUFBNEIsMkNBQXNCO1VBQUEsaUNBQ2hEO01BQ0osOERBQ047VUFBQTtVQUFBO01BQXFDLGtFQUNqQztVQUFBO1VBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQSx1Q0FBQTtVQUFBO1VBQUEsb0RBQW9DLE9BQW1EO1VBQUE7TUFFOUUsOERBQ1A7VUFBQSx1Q0FDSjtVQUFBLHlCQUNOO1VBQUE7VUFBQSwwREFBZ0Q7VUFBQSwyQ0FDNUM7VUFBQTtVQUFBLDRDQUFzQjtVQUFBLGlDQUNsQjtVQUFBO1VBQUEsZ0JBQUc7TUFDQztVQUFBO01BQTZCO01BQzdCLDhEQUNGO1VBQUEsMkNBQ047VUFBQSwwREFBQTtVQUFBO01BRU0sOERBQ047VUFBQSx3RUFBQTtVQUFBO2NBQUEsd0JBR007TUFDSixzREFDSjtVQUFBLGlCQUNKLDhDQUNKO1VBQUE7O0lBbEN3RDtJQUFsRCxZQUFrRCxTQUFsRDtJQWE0QztJQUFwQyxZQUFvQyxTQUFwQztJQVc0QjtJQUFoQyxZQUFnQyxTQUFoQztJQUdzQjtJQUF0QixZQUFzQixTQUF0Qjs7O0lBM0JDO0lBQUwsV0FBSyxTQUFMO0lBUW1DO0lBQUE7SUFDSztJQUFBO0lBWUM7SUFBQTs7OztvQkMxQnpEO01BQUE7YUFBQTtVQUFBO0lBQUE7Ozs7In0=