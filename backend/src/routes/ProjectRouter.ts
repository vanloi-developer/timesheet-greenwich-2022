import { authorAdmin } from './../middlewares/auth';
import { validQueryID, validQueryInput } from '../middlewares/validate/FieldValidate';
import { validate } from '../middlewares/validate/FieldValidate';
import ProjectService from '../services/ProjectService';
import { BaseRouter } from './BaseRouter';

const FAKE_GetProjectsIncludingTasks = {
   result: [
      {
         projectName: 'test luong',
         customerName: 'NCC-Hanoi',
         projectCode: 'abcdef123',
         projectUserType: 0,
         listPM: ['Tien Nguyen Huu', 'qử qwe'],
         tasks: [
            { projectTaskId: 495, taskName: 'Tiến Ánh Phạm 157', billable: true },
            { projectTaskId: 496, taskName: 'svs', billable: true },
            { projectTaskId: 497, taskName: 'có xóa được', billable: true },
            { projectTaskId: 498, taskName: '321de222222', billable: true },
            { projectTaskId: 501, taskName: '1', billable: true },
            { projectTaskId: 499, taskName: 'done', billable: true },
            { projectTaskId: 502, taskName: 'Ánh nắng lấp lánh 2', billable: true },
            { projectTaskId: 500, taskName: 'comd', billable: true },
         ],
         targetUsers: [],
         id: 171,
      },
      {
         projectName: 'New-Project 2',
         customerName: 'NCC-Hanoi',
         projectCode: 'NCC-23082512',
         projectUserType: 2,
         listPM: ['Tien Nguyen Huu', 'Tien Pham'],
         tasks: [
            { projectTaskId: 443, taskName: 'cai gi 1234567', billable: true },
            { projectTaskId: 449, taskName: 'cái gì', billable: true },
            { projectTaskId: 444, taskName: 'Other Khong xoa duoc 6ádasdasd', billable: true },
            { projectTaskId: 445, taskName: 'svs', billable: true },
            { projectTaskId: 446, taskName: 'có xóa được', billable: true },
            { projectTaskId: 447, taskName: '321de222222', billable: true },
            { projectTaskId: 448, taskName: 'done', billable: true },
         ],
         targetUsers: [],
         id: 162,
      },
   ],
   targetUrl: null,
   success: true,
   error: null,
   unAuthorizedRequest: false,
   __abp: true,
};
class ProjectRouter extends BaseRouter {
   private _service = ProjectService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Save', authorAdmin, this._service.createOrEdit);
      this.router.post('/Inactive', authorAdmin, validate(['id']), this._service.inactive);
      this.router.post('/Active', authorAdmin, validate(['id']), this._service.active);

      this.router.get('/getAll', authorAdmin, this._service.getAll);
      this.router.get('/Get', authorAdmin, validQueryInput, this._service.getById);
      this.router.get('/GetProjectsIncludingTasks', this._service.getProjectsIncludingTasks);

      this.router.delete('/Delete', validQueryID, this._service.deleteById);
   }
}

export = new ProjectRouter().router;
