<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_super_admin = new Role();
        $role_super_admin->role = 'Super Admin';
        $role_super_admin->save();

        $role_admin = new Role();
        $role_admin->role = 'Admin';
        $role_admin->save();

        $role_user = new Role();
        $role_user->role = 'User';
        $role_user->save();
    }
}
