<template>
  <!-- Meet the Team Section -->
  <h3
    class="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
  >
    Meet the Team
  </h3>

  <div class="w-full overflow-x-auto pb-4">
    <div class="flex gap-4 px-4 whitespace-nowrap">
      <div
        v-for="member in teamMembers"
        :key="member.id"
        class="flex flex-col items-center gap-2 flex-shrink-0"
      >
        <img
          class="w-24 h-24 rounded-full object-cover"
          :data-alt="member.alt"
          :src="member.image"
          :alt="member.alt"
        />
        <div class="text-center">
          <p class="font-bold text-sm text-gray-900 dark:text-white">{{ member.name }}</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">{{ member.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamSection',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCnLEw2deUi1bkq5m-m_Uh_HASzePytevR5qRI63NudzSWB7N0zkjEZIDxPVq8cSjsPVeH9c2e6SQL_TUhDKdK6p5O-IzhGPom_oKXjpZ2-WooMq9igEM2VtoYsF0g2EhItGufMh65moZvuIBvaqfR7X4rpfWQQZ6eba0TEZmn8lFPOtHK9xB6gV4nrL20sWXKJHzMnd8EE-WLSRDgjwjQpBZqhmSjsGf7I4rtCIRK5YYswpywXxSaxjU_VNqsxmYs09mS7XOQzNhg',
          alt: 'Profile picture of Alex Johnson',
          name: 'Alex Johnson',
          position: 'Co-Founder & CEO',
        },
        {
          id: 2,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB8gCl9Acq4nf28JkcrNYJz543nSTWrRQ7IJ9NYHew369GdT-yLqeSphrfnFP5FO-33SpJF4Pppc2cMQajCZHQl6UNosDxZg_D32cYgrYG4XHpJ-VUAceh69Qs_dHyIiKrws_Z1JTWdofx_CI2svVYm8GY84y3wJU_gGkVfJJtOTj6Y4_K_pVE2Xe7PEOyocpLH690G9e_Lj35UfJOmeu2rRl-MEPGMvLfy74SCCFA7RKPOGc4eM70JAqk1fnA7_X9KeAWeOkoUV08',
          alt: 'Profile picture of Maria Garcia',
          name: 'Maria Garcia',
          position: 'Co-Founder & CTO',
        },
        {
          id: 3,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCdnpsErxmdnCf-QrDlwcvC7WJLOT1BLx1D1lc_nrYzgams_vqiShOwEKTThkckl8CuDBmMk2iOX4v5Qq3n4yRM0YpkebcAgLaQKOvG1T05BatnRC_Zik5j4sGMcPPIH_IOb-WdCJpPeWGa0_Ey6ydIA9QCT6bkTkSHyjwt_Z8EeldKyordehJkILQqg2vAjz5AQSaNaJbYPj14XEfDznckSKXJ_EvXu5dsgJDD3uGB2NlkCPy4wVtXN3Q-6YMOubGWNtDkCZr13JI',
          alt: 'Profile picture of David Chen',
          name: 'David Chen',
          position: 'Lead Engineer',
        },
        {
          id: 4,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBam56EonkLTf9DB0Z5gIqznIyKwGruNMkq39Pzp0sdAVX3Q6U8Vziw2ixfz5zFfAzB8SPiua9zpVGMW3tSExktphStwIhGPVeOfVjgCz1cOatdl802qprDkXeSx4tPoYalv2eaoCkn58IuufgdPkkGvcRB3dVKE-FVhjUBL1b_wBOttCx0qVxnmcADprETP58AZGvvy_l9itSYPD02nA4kFjJPwIBSci5gq4_IiPuGn8RWSVmpIftJZtriacsrvROtEGEnBq4ltp0',
          alt: 'Profile picture of Sarah Miller',
          name: 'Sarah Miller',
          position: 'Head of Product',
        },
      ],
    }
  },
}
</script>
