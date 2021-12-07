<script lang="ts">
  import Gift from "../components/Gift.svelte";

  import {onMount} from "svelte";
  import { getFirestore, onSnapshot, getDocs, collection } from '@firebase/firestore';
  import type { giftI } from '../types';

  onMount(async () => {

    const db = getFirestore();

    const giftsCollection = collection(db, 'gifts')

    const giftsCol = await getDocs(giftsCollection)
    giftsCol.forEach((doc) => {
      gifts[doc.id] = { id: doc.id, ...doc.data() } as giftI
    })


    onSnapshot(giftsCollection, async (col) => {
      col.forEach((doc) => {
        gifts[doc.id] = { id: doc.id, ...doc.data() } as giftI
      })
    })

  })

  export let gifts: { [id: string]: giftI } = {}
  const colors = ['bg-db-brown-dark', 'bg-db-blue-light', 'bg-db-grey-dark', 'bg-db-brown-light', 'bg-db-blue-dark',  'bg-db-grey-light']
</script>

<div class='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 align-center'>
  {#each Object.values(gifts).sort((a, b) => (a.taken === b.taken ? parseInt(a.childAge) - parseInt(b.childAge) : a.taken ? Infinity : 0)) as gift, index (index)}
    <a href={gift.taken ? '/' : `/gift/${gift.id}`} class={`px-4 py-8 text-white font-medium cursor-pointer ${colors[index % colors.length]}
    hover:bg-db-yellow
    transition-colors duration-300
    `}>
      <Gift {...gift} />
    </a>
  {/each}
</div>
