import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OnlineDirective } from "./directives/online.directive";
import { LocacionPipe } from "./pipes/locacion.pipe";
import { NombreCompletoPipe } from "./pipes/nombre-completo.pipe";
import { ControlErrorMessagesPipe } from "./pipes/control-error-messages.pipe";

@NgModule({
  declarations: [
    OnlineDirective,
    LocacionPipe,
    NombreCompletoPipe,
    ControlErrorMessagesPipe,
  ],
  imports: [CommonModule],
  exports: [
    OnlineDirective,
    LocacionPipe,
    NombreCompletoPipe,
    ControlErrorMessagesPipe,
  ],
})
export class SharedModule {}
