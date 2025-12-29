<template>
    <div class="wrapper">
        <layout-login-header />
        <div class="container">
            <slot />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    .container {
        padding: 0;
        margin-top: 20px;
    }
}
</style>