<template>
  <div>
    <h4
      class="px-4 py-2 text-center text-sm font-bold leading-normal tracking-[0.015em] text-zinc-600 text-zinc-300"
    >
      Connect Your Favorite Databases
    </h4>
    <div class="h-5"></div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      <DatabaseLogo
        v-for="database in databases"
        :key="database.id"
        :image="database.image"
        :alt="database.alt"
      />
    </div>
  </div>
</template>

<script>
import DatabaseLogo from './DatabaseLogo.vue'

export default {
  name: 'DatabaseGrid',
  components: {
    DatabaseLogo,
  },
  data() {
    return {
      databases: [
        {
          id: 1,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC3iOHdKidRDDZfw5ei04Q8DHuosJQ5eB-JESJp0DLpv1Yoj3iqQIlmi48f4VyrGatbf-cSPtXgSe77pvhKPR2th23to0cVq7axUTCIMPFRdrxD-hRJAPSKGYmFcu1dHXeweJjXxbouSdqnC81MP3CU5f0rfOruZLQpBYwALBAM8WEDj22WK6adonPAw9vJBu13unrLWn_TCnqkrW1OP3SKsgfPHKUpKxb3Q2nn4SAUHemLhz9rCuDF1P1dpwMiZx0JUjO02_nT0Xk',
          alt: 'MySQL logo',
        },
        {
          id: 2,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfPd_BqJqs_5I7MFggcG1Llr9iS_l63Mr4L3m-77aiOcE1aHAmMv7mUXrgA2K_11HVBvO_TKD5nAAUxcd1BrgXbu5o40lHfIAtKTt354WFSAvRoi47hGoubzIeMUBy_Q7dNXChHvMIeKEpUn-Kn5CFOr95Vd1HHXbBKDTQEYt2Y5pYwB6UYht7CWc4MTUoOf0eOe2ClhoMKEFUydnUCN3RlZHrUNWNKsDK111qqDbQ6GGs4meB2vhBgRLKRPNQj1RYlBt9y-G8n6M',
          alt: 'PostgreSQL logo',
        },
        {
          id: 3,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCkxau-hhv86jaqJbpqZ96spxV7Y-RbWnQQjHxr_ucPONuhNmaVtF9ZnnotvX7cvcNSIgJZDmlDtMcXZUk5-Pg3-N9yKMi4iWro_8_8SGzayBEwKr74AnJnjIQcmLnJN-VMWKIo0FsCaJyJOKrV3HJKUACSwU9HKQAOXUeQC57wtoYPy3A0_N7d34jvy5HeNBtpPGg3xH4zntFVoRScQ4ioBicaYZh7ntNd_zxc1FA6-wcjWwNDDn3ysCJfDSsrqbT9HhXKqfybzrg',
          alt: 'MongoDB logo',
        },
        {
          id: 4,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDVgcf89HcBY4l2fcy2DVfsbonaFIZwwm2T-WriU2B-2z8tzvUlG5K3JZ_CvyNebDbLRPCYEcKTQysHAbPOBiBpLl3MHBVQF9hhbwWaLKWdeEHG_l511VbKUW85qYeXfHqahjxjyK5sPq7kEE2T-GkKzqQ4gsIvggip0SnB4x9QbowQTKRIE664FxA0eDeFc2Vsr3t2v2MjHBj0bhWqJbn8nPW2jqVD-vaEMWfuZuKWQjmZq-3lkgk1g_tU2qG8h_ROeBwlC3BFUCQ',
          alt: 'Microsoft SQL Server logo',
        },
        {
          id: 5,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC8XECpZ3QCuInRl2SI30YZnNV5bDOszYRDc9wGiRPDQhMUYn4-BsBxkSP_PEnXZMEg0dDlgdmH3eqdHUnjXAbt_go6KFQDxwqLRi5561mk6QQv8dDcYUXoR_vVyH4cN8ik5CXgdc_tUEdvSUoG0nyW07g5vack66f9WqL-BNdXD35J9N97qyDqnDNbgUI7z8gMPyTPqeo-ql8V0NFJv2HosW-_r9KyJdFtziFK_wo8sq97adSB5oiKLzZ8RsBWsZl-_ufSB46isMg',
          alt: 'Redis logo',
        },
        {
          id: 6,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDxL4zveStQEZITdq6gMYOjobu3s24N70bPciSLQr8MByPj4Qa86oc2Wp6VcgRb8DH9oaX7c4GX3XIWI45LSLHZg8gbTt8De7Mw-iFJPh6LV2HxqOEtmHWixwP3CdptxZtHc1WImjfmgUPwoiA5zYFNQF4-aOyIdgnojSlCAVGo8u3InunfTUs7qYUQ-O3xnPMMv-ATQrpqBKZGD_giUQTq3DLrxwifaKiI1BM1WuL4y9XQJxlG6vwd8eJNuaNgvWSJWcw1wL3zpQ8',
          alt: 'Cassandra logo',
        },
      ],
    }
  },
}
</script>
