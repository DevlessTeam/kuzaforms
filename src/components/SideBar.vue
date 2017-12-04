<template>
    <div class="md w-1/6 h-full bg-transparent">
        <div class="p-4">
            <p class="text-grey-darker font-bold font-sans">Main Menu</p>
            <ul class="list-reset">
             
                <router-link class="p-2 rounded bg-white border font-semibold shadow-lg" tag='li' :to="{name: 'Dashboard'}">
                    <a class='text-grey-darker no-underline' href="/">
                        <i class="fa fa-tachometer mr-2"></i> Dashboard</a>
                </router-link>
                <router-link class="p-2 rounded my-4" :to="{name: 'Forms'}" tag="li">
                    <a class='text-grey no-underline' href="/activity">
                        <i class="fa fa-file-text mr-2"></i> Forms</a>
                </router-link>
                <router-link class="p-2 rounded my-4" tag="li" :to="{name: 'Analytics'}">
                    <a class='text-grey no-underline'>
                        <i class="fa fa-pie-chart mr-2"></i>Analytics
                    </a>
                </router-link>
                <router-link tag='li' :to="{name: 'Plugins'}" class="my-4 p-2 rounded">
                    <a class='new text-grey no-underline'>
                        <i class="fa fa-puzzle-piece mr-2"></i> Plugins
                    </a>
                </router-link>
                <router-link tag='li' :to="{name: 'Settings'}" class="my-4 p-2 rounded">
                    <a class='new text-grey no-underline'>
                        <i class="fa fa-user mr-2"></i> Account
                    </a>
                </router-link>
            </ul>
        </div>
    </div>
</template>