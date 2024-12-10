// stores/menu.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';


// Define la interfaz para los elementos del menú
export interface MenuItem {
  id: number;
  label: string;
  path: string;
  icon?: string;
}

export const useMenuStore = defineStore('menu', () => {
  // Menú izquierdo
  const leftMenuItems = ref<MenuItem[]>([
    { id: 1, label: 'Blog', path: '/blog' },
    { id: 2, label: 'Users', path: '/users' },
    { id: 3, label: 'Gestión de Bonos', path: '/gestion-bonos' },
  ]);

  // Menú derecho
  const rightMenuItems = ref<MenuItem[]>([
    { id: 5, label: 'Registro Usuarios', path: '/register-user' },
    { id: 6, label: 'Registro Empresas', path: '/register-empresa' },
  ]);

  // Iconos
  const iconItems = ref<MenuItem[]>([
    { id: 8, label: 'Profile', path: '/profile', icon: 'uiw:user' },
    { id: 9, label: 'Favorites', path: '/favorites', icon: 'uiw:heart-off' },
    { id: 10, label: 'Cart', path: '/cart', icon: 'gala:bag' },
  ]);

  // Menú móvil
  const mobileMenuItems = computed(() =>
    [
      ...leftMenuItems.value.map((item) => ({
        label: item.label,
        icon: 'i-heroicons-chevron-right-20-solid',
        to: item.path,
      })),
      ...rightMenuItems.value.map((item) => ({
        label: item.label,
        icon: 'i-heroicons-chevron-right-20-solid', // Igual para estos items
        to: item.path,
      })),
      ...iconItems.value.map((item) => ({
        label: item.label,
        icon: item.icon || '', // Si no hay icono, usa un string vacío o un valor por defecto
        to: item.path,
      })),
    ] as { label: string; icon: string; to: string }[] // Especificamos explícitamente el tipo del array
  );


  // Estado del buscador
  const isSearchOpen = ref(false);
  const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
  };

  // Estado del modo oscuro
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === 'dark');
  const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  };

  // Retorna todos los datos y funciones
  return {
    leftMenuItems,
    rightMenuItems,
    iconItems,
    mobileMenuItems,
    isSearchOpen,
    toggleSearch,
    isDark,
    toggleDarkMode,
  };
});
