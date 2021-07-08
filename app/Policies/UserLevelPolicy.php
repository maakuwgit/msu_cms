<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserLevelPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the user is an Administrator.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function enable(User $user)
    {
        return $user->user_level_id === 1;
    }
}
