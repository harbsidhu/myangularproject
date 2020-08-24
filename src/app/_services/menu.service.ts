import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    public getMenuItems(isCouncil: boolean) {
        const menu: NbMenuItem[] = [
            {
            title: 'Dashboard',
            icon: { icon: 'chalkboard-teacher', pack: 'solid' },
            link: '/dash/dashboard',
            home: true,
            },
            {
            title: 'MarketPlace',
            icon: { icon: 'store', pack: 'solid' },
            link: '/marketplace/dashboard',
            },
            {
            title: 'Resources',
            icon: { icon: 'recycle', pack: 'solid' },
            link: '/dash/resources',
            },
            {
            title: 'Matches',
            icon: { icon: 'check-double', pack: 'solid' },
            link: '/marketplace/matches',
            },
        ];

        if (isCouncil) {
            menu.push( {
            title: 'Council',
            icon: { icon: 'landmark', pack: 'solid' },
            link: '/dash/council',
            });
        }
        return menu;
    }
}
