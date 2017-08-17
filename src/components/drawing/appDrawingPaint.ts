import * as angular from 'angular';
import { DrawModel } from '../../Models/drawModel';
import Models from '../../models/models';
import { PathModel } from '../../Models/pathModel';
import DrawService from '../../Services/drawService';
import ComponentBase from '../componentBase';

export default class AppDrawingPaint extends ComponentBase {
  public static readonly IID: string = 'paintComponent';

  protected static setOptions(options: ng.IComponentOptions) {
    super.setOptions(options);

    options.templateUrl = './appDrawingPaint.html';
    options.controllerAs = 'paintCtrl';
    options.bindings = {
      isNewPaint: '<',
    };
  }
  private drawModel: DrawModel = new DrawModel();
  private isNewPaint: boolean;
  public static $inject = ['drawService', '$window'];

  public constructor(
    private drawService: DrawService,
    private window: ng.IWindowService,
  ) {
    super();
    if (this.isNewPaint) {
      this.drawService.createSVGImage(
        this.window.innerWidth,
        this.window.innerHeight,
      );
    } else {
      this.drawService.loadSVGImage();
    }
  }
}
