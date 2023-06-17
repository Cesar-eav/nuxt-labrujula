<template>
<li
v-for="ubication in listUbications"
:key="ubication.id"
>
<a
  :href="'/atractivos/' + ubication.name"
  class="Sub-menu block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  >{{ ubication.name }}</a
>
</li>
</ul>
</div>
</div>
</div>

<a href="/atractivos" class="menuPrincipal">Street Art</a>

<a href="/artistas" class="menuPrincipal">Artistas</a>

<a href="/ascensores" class="menuPrincipal">Ascensores</a>

<a href="/escaleras" class="menuPrincipal">Escaleras</a>

<a href="/miradores" class="menuPrincipal">Miradores</a>

<a href="/centros-culturales" class="menuPrincipal">Centros Culturales</a>

<a href="/iglesias#" class="menuPrincipal block py-2">Iglesias</a>

<a href="/arquitecturas" class="menuPrincipal block py-2">Arquitectura</a>

<a href="/plazas-parques-huertos" class="menuPrincipal">Parques y Plazas</a >

<a href="/bares" class="menuPrincipal">Bares</a>

</template>