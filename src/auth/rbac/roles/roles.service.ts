import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RolesService {

    constructor(private userService: UsersService) { }

    // get user roles

    async getUserPermissions(userId: string): Promise<Permission[]> {
        
        const user = await this.userService.findOneWithRoles(userId);

        return user.role.permissions;


       
    }



    // get roles permissions 


}
