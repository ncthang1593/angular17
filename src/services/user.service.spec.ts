import { TestBed, waitForAsync } from '@angular/core/testing';
import { UserService } from './user.service';
import { UtilsService } from './utils.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const utilsServiceMock = {
    checkNumber: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        {
          provide: UtilsService,
          useValue: utilsServiceMock,
        },
      ],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add user', () => {
      service.addUser({ name: 'user', id: 1 });
      service.user$.subscribe((user) => {
        console.log(user);
        expect(user).toEqual([{ name: 'user', id: 1 }]);
      });
      // expect(service.user$.getValue()).toEqual([{ name: 'user', id: 1 }]);
    });
  });

  describe('getPosts', () => {
    it('should return posts', () => {
      let post: any = [];
      service.getPosts().subscribe((res) => {
        post = res;
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      req.flush([
        {
          userId: 1,
          id: 1,
        },
      ]);
      expect(post).toEqual([
        {
          userId: 1,
          id: 1,
        },
      ]);
    });

    it('should return posts with waitForAsync', waitForAsync(() => {
      service.getPosts().subscribe((res) => {
        expect(res).toEqual([
          {
            userId: 1,
            id: 1,
          },
        ]);
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      req.flush([
        {
          userId: 1,
          id: 1,
        },
      ]);
     
    }));
  });

  // describe('removeUser', () => {
  //   it('should remove user', () => {
  //     service.user = [
  //       {
  //         name: 'user',
  //         id: 1,
  //       },
  //       {
  //         name: 'user2',
  //         id: 2,
  //       },
  //     ];
  //     service.removeUser(2);
  //     expect(service.user).toEqual([
  //       {
  //         name: 'user',
  //         id: 1,
  //       },
  //     ]);
  //   });

  it('should return isNumber', () => {
    utilsServiceMock.checkNumber.mockReturnValue(true);
    service.getIsNumber(10);
    expect(service.getIsNumber(10)).toEqual(true);
  });
});
