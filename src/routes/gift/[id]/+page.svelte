
<script lang="ts">
	import type { PageData } from './$types'
	import {initializeApp} from "@firebase/app";
	import {doc, getDoc, getFirestore, onSnapshot} from "@firebase/firestore";
	import {onMount} from 'svelte';
	import * as yup from 'yup'
	import type {giftI} from "../../../types";
	import {firebaseConfig} from "../../../firebase";

	export let data: PageData
	let gift: giftI = { childAge: '', childName: '', id: '', name: '', taken: false }

	let formValues = {
		name: '',
		phone: '',
		email: '',
	}
	let sending = false
	let successfullySent = false

	onMount(async () => {

		initializeApp(firebaseConfig)

		const db = getFirestore()

		const giftRef = doc(db, 'gifts', data.id)

		const g1 = await getDoc(giftRef)

		if (g1.exists())
			gift = g1.data() as giftI

		onSnapshot(giftRef, async (g) => {
			if (g.exists()) {
				gift = g.data() as giftI
			}
		})

	})

	let schema = yup.object().shape({
		name: yup.string().required("Jméno je povinné!"),
		phone: yup.string().required("Telefon je povinný!"),
		email: yup.string().required("Email je povinný!").email("Email není platný!"),
	})
	// TODO: type
	let errors: any = {}

	async function validate(): Promise<void> {
		try {
			await schema.validate(formValues, {abortEarly: false});
			errors = {}
		} catch (err) {
			errors = err.inner.reduce((acc, err) => {
				return { ...acc, [err.path]: err.message };
			}, {});
		}
	}

	async function register() {
		if (gift.taken || sending) return
		await validate()
		if (Object.values(errors).length >= 1) return

		sending = true

		fetch(`https://us-central1-strom-splnenych-prani-db.cloudfunctions.net/gift/${data.id}`, { method: 'POST', body: JSON.stringify({
				name: formValues.name,
				phone: formValues.phone,
				email: formValues.email
			}), headers: { 'Content-Type': 'application/json' }
		})
			.then(async res => {
				sending = false
				return { res, json: await res.json()}
			})
			.then(res => {
				if (!res.json.error)
					successfullySent = true
			})
	}
</script>

<div class='grid grid-cols-1 md:grid-cols-2 gap-5 text-white'>
	<div class='bg-db-blue-light px-4 py-8'>
		<p>{ gift.name }</p>
		<p>{ gift.childName } ({ gift.childAge}let)</p>
	</div>
	{#if !gift.taken}
		<div class='bg-db-brown-light px-4 py-8 text-black'>
			<form on:submit|preventDefault={ register } class='flex flex-col'>
				<label for='name' class='text-white'>Jméno:</label>
				<input id='name' class={`outline-none p-1 bg-white border-solid border border-gray-400 focus:border-blue-600 ${ errors.name ? 'invalid' : ''}`} bind:value={formValues.name} on:input={validate}>
				{#if errors.name}
					<p class='text-red-500 text-xs'>{errors.name}</p>
				{/if}
				<label for='phone' class='text-white'>Telefon:</label>
				<input id='phone' class={`outline-none p-1 bg-white border-solid border border-gray-400 focus:border-blue-600 ${ errors.phone ? 'invalid' : ''}`} bind:value={formValues.phone} on:input={validate}>
				{#if errors.phone}
					<p class='text-red-500 text-xs'>{errors.phone}</p>
				{/if}
				<label for='email' class='text-white'>Email:</label>
				<input id='email' class={`outline-none p-1 bg-white border-solid border border-gray-400 focus:border-blue-600 ${ errors.email ? 'invalid' : ''}`} bind:value={formValues.email} on:input={validate}>
				{#if errors.email}
					<p class='text-red-500 text-xs'>{errors.email}</p>
				{/if}
				<button class='mt-4 px-4 py-2 rounded-xl w-max mx-auto bg-db-yellow text-white' type="submit">
					{#if !sending}
						Registrovat
					{:else}
						<div class='w-6 h-6 mx-5 border-solid border-t-2 rounded-full border-white animate-spin duration-300'></div>
					{/if}
				</button>
			</form>
		</div>
	{:else if successfullySent}
		<div class='bg-db-brown-light px-4 py-8 text-green-500'>
			Dárek byl úspěšně zarezervován
		</div>
	{:else}
		<div class='bg-db-brown-light px-4 py-8 text-white'>
			Tento dárek je již zabrán
		</div>
	{/if}
</div>

<style>
    .invalid {
        @apply border-red-500;
    }
</style>
