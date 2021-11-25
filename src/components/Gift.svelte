<script lang="ts">
    export let id = ''
    export let name = ''

    export let childName = ''
    export let childAge = ''

    export let taken = false
</script>

<div class={ 'flex flex-col gap-2 ' + (taken ? 'line-through' : 'no-underline') }>
    <p class="font-black">{ name }</p>
    <p>{ childName } ({ childAge }let)</p>
</div>
