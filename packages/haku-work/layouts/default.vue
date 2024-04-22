<template>
    <HeaderSection />
        <div class="main-contents">
            <slot />
        </div>
    <FooterSection />
</template>

<script>
import HeaderSection from "~/components/Header.vue";
import FooterSection from "~/components/Footer.vue";

export default {
    components: {
        HeaderSection,
        FooterSection
    }
}
</script>
 
<style>
</style>