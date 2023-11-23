<template>
    <div class="nav">
        <div style="background-color: #B2B18F; height: 100vh; width:100%;">
            <router-link to="/listproducts">
                <button class="btn p-3" style="width: 90%; margin-left: 12px;">Product Management</button>
            </router-link>
            <router-link to="/listusers">
                <button class="btn mt-3 p-3" style="width: 90%; margin-left: 12px;">User Management</button>
            </router-link>
            <router-link to="/listorders">
                <button class="btn mt-3 p-3" style="width: 90%; margin-left: 12px;">Order Management</button>
            </router-link>
        </div>
    </div>
</template>
