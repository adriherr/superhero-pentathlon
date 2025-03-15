import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SuperHeroManagerView from '../views/SuperHeroManagerView.vue';
import TestsSimulatorView from '../views/TestsSimulatorView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomeView },
    {
      path: "/superhero-manager",
      name: "SuperHeroManager",
      component: SuperHeroManagerView,
    },
    {
      path: "/tests-simulator",
      name: "TestsSimulator",
      component: TestsSimulatorView,
    },
  ],
});

export default router;