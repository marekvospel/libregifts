<script lang="ts">

    import {
        addDoc,
        collection,
        doc,
        DocumentData,
        getDoc,
        getFirestore,
        UpdateData,
        updateDoc
    } from "@firebase/firestore";

    export let id = ''
    export let name = ''

    export let childName = ''
    export let childAge = ''

    export let taken = false

    function reserveClick() {
        reserve('Marek', '123456789')
    }

    async function reserve(name: string = '', phone: string = '') {
        //if (taken) return false

        const db = getFirestore()

        const giverRef = collection(db, 'givers')

        console.log(id)

        try {
            await addDoc(giverRef, {
                name: 'Marek',
                phone: 123456789,
                gift: id
            } as DocumentData)
        } catch (e) {
            console.error(e)
            return false
        }

        return true
    }
</script>

<div class={ '' + (taken ? 'line-through' : 'no-underline') }>
    <p>{ name }</p>
    <p>{ childName } ({ childAge }let)</p>
    <button class="px-4 py-2 rounded-md bg-blue-400" on:click={ reserveClick }>reserve</button>
</div>
