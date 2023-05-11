import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpTestingController } from '@angular/common/http/testing';
import { UsuariosDetallesComponent } from './usuarios-detalles.component';

describe('UsuariosDetallesComponent', () => {
  let component: UsuariosDetallesComponent;
  let fixture: ComponentFixture<UsuariosDetallesComponent>;
  let httpController: HttpTestingController;
  const mockResp: any = {}

  beforeEach(async () => {
    httpController = TestBed.inject(HttpTestingController);
    await TestBed.configureTestingModule({
      declarations: [ UsuariosDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestGet Usuario ID Detalles', () => {
  
    const req = httpController.expectOne({method: 'GET', url: 'http://localhost/api/usuarios/2'})
    req.flush(mockResp);
  
  })

});
