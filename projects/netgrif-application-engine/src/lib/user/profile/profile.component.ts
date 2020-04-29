import {Component, Injector, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'nae-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @Input() public user: User;
    public obj;

    constructor(private _injector: Injector) {
        this.obj = Object;
    }

    ngOnInit(): void {
        if (!this.user) {
            const userService: UserService = this._injector.get(UserService);
            if (userService) {
                this.user = userService.user;
                userService.user$.subscribe(user => {
                    this.user = user;
                    this.user.preferences = {
                        caseHeaders: {
                            viewId: {
                                column0: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column1: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column2: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column3: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column4: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'}
                            }
                        },
                        caseFilters: {
                            viewId: []
                        },
                        taskHeaders: {
                            viewId: {
                                column0: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column1: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column2: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column3: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column4: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'}
                            }
                        },
                        taskFilters: {
                            viewId: []
                        },
                        workflowHeaders: {
                            viewId: {
                                column0: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column1: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column2: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column3: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'},
                                column4: {type: 'string', identifier: 'string', title: 'string', sortMode: 'string', searchQuery: 'string'}
                            }
                        },
                        workflowFilters: {
                            viewId: []
                        },
                    };
                });
            }
        }
    }

    get userBanner(): string {
        return this.user && this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }
}
