import * as angular from "angular";
import ComponentBase from "./componentBase";
import { PathModel } from "../Models/pathModel";
import { DrawModel } from "../Models/drawModel";
import DrawService from "../Services/drawService";
import Models from "../models/models";

export default class appDrawingPaint extends ComponentBase {

  public static readonly IID: string = "paintComponent";

  protected static setOptions(options: ng.IComponentOptions) {
    super.setOptions(options);

    options.templateUrl = "../components/appDrawingPaint.html";
    options.controllerAs = "paintCtrl";
    options.bindings = {
      isNewPaint: '<'
    };
  }
  private drawModel: DrawModel = new DrawModel();
  private isNewPaint: boolean;
  public static $inject = ["drawService", "$window"];
  
  public constructor(private drawService: DrawService, private window: ng.IWindowService) {
    super();
    if (this.isNewPaint){
      this.drawService.createSVGImage(this.window.innerWidth, this.window.innerHeight)
    } else {
      this.drawService.loadSVGImage();
    }
  }
}
