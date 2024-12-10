<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';

// Acceso al store
const menuStore = useMenuStore();

// Datos del menú
const leftMenuItems = menuStore.leftMenuItems;
const rightMenuItems = menuStore.rightMenuItems;
const iconItems = menuStore.iconItems;
const mobileMenuItems = menuStore.mobileMenuItems;

// Funcionalidad del buscador
const isSearchOpen = computed(() => menuStore.isSearchOpen);
const toggleSearch = menuStore.toggleSearch;

// Modo oscuro
const isDark = computed(() => menuStore.isDark);
const toggleDarkMode = menuStore.toggleDarkMode;
</script>

<template>
  <div class="sticky top-0 z-50 border-b bg-surface-primary/80 backdrop-blur-sm border-surface-tertiary/50">
    <nav class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between px-4 py-4 lg:px-8">
        <!-- Logo -->
        <LogoComponents class="flex-shrink-0 pr-4" />

        <!-- Desktop Menu - Left -->
        <div class="hidden space-x-8 lg:flex">
          <NuxtLink v-for="item in leftMenuItems" :key="item.id" :to="item.path"
            class="transition-colors text-label-large text-content-secondary hover:text-content-primary">
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Search Bar - Desktop -->
        <div class="flex-1 hidden max-w-xs mx-8 lg:block">
          <USelect icon="i-heroicons-magnifying-glass-20-solid" color="gray" size="sm" placeholder="Search..."
            class="bg-surface-secondary" />
        </div>

        <!-- Desktop Menu - Right -->
        <div class="items-center hidden space-x-8 lg:flex">
          <NuxtLink v-for="item in rightMenuItems" :key="item.id" :to="item.path"
            class="transition-colors text-label-large text-content-secondary hover:text-content-primary">
            {{ item.label }}
          </NuxtLink>

          <!-- Icons -->
          <NuxtLink v-for="item in iconItems" :key="item.id" :to="item.path"
            class="transition-colors text-content-secondary hover:text-content-primary" :title="item.label">
            <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" />
          </NuxtLink>

          <!-- Dark Mode Toggle -->
          <UButton color="gray" variant="ghost"
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'" @click="toggleDarkMode" />
        </div>

        <!-- Mobile Navigation -->
        <div class="flex items-center space-x-4 lg:hidden">
          <!-- Mobile Search Toggle -->
          <UButton color="gray" variant="ghost" icon="i-heroicons-magnifying-glass-20-solid" @click="toggleSearch" />

          <!-- Dark Mode Toggle - Mobile -->
          <UButton color="gray" variant="ghost"
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'" @click="toggleDarkMode" />

          <!-- Mobile Menu Dropdown -->
          <UDropdown :items="mobileMenuItems" :popper="{ placement: 'bottom-end' }"
            class="border bg-surface-primary border-surface-tertiary">
            <UButton color="gray" variant="ghost" icon="i-heroicons-bars-3-20-solid" />
          </UDropdown>
        </div>
      </div>

      <!-- Mobile Search Bar - Expandable -->
      <div v-show="isSearchOpen" class="px-4 pb-4 lg:hidden">
        <USelect icon="i-heroicons-magnifying-glass-20-solid" color="gray" size="sm" placeholder="Search..."
          class="bg-surface-secondary" />
      </div>
    </nav>
  </div>
</template>

<style></style>
