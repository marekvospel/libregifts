<script lang="ts" context="module">
	import type {giftI} from "../../types";
	import {initializeApp} from "@firebase/app";
	import {firebaseConfig} from "../../firebase";
	import {doc, getDoc, getFirestore} from "@firebase/firestore";

	let db;

	/** @type {import('@sveltejs/kit').RequestHandler} */
	export async function load({ page }) {

		if (!page.params.id) return {}

		initializeApp(firebaseConfig)

		db = getFirestore();

		const gift = await getDoc(doc(db, 'gifts', page.params?.id));

		if (gift.exists())
			return { props: { ...page?.params, gift: gift.data() }}

		return { props: { ...page?.params } }
	}
</script>

<script lang="ts">
	import {onSnapshot} from '@firebase/firestore';
	import {onMount} from 'svelte';
	import * as yup from 'yup'

	export let id = ''
	export let gift: giftI = null

	let formValues = {
		name: '',
		phone: '',
		email: '',
	}
	let sending = false

	onMount(async () => {

		const giftRef = doc(db, 'gifts', id)

		onSnapshot(giftRef, async (g) => {
			if (g.exists()) {
				gift = g.data()
			}
		})

	})

let schema = yup.object().shape({
	name: yup.string().required("Jmeno je povinne!"),
	phone: yup.string().required("Telefon je povinny!"),
	email: yup.string().required("Email je povinny!").email("Email neni platny!"),
})
	let errors = {}

	async function validate(): Promise<void> {
		try {
			const validateResult = await schema.validate(formValues, {abortEarly: false});
			errors = {}
		} catch (err) {
			errors = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
		}
	}

	async function register() {
		await validate()
		if (gift.taken || Object.values(errors).length >= 1) return false

		fetch(`https://us-central1-strom-splnenych-prani-db.cloudfunctions.net/gift/${id}`, { method: 'POST', body: JSON.stringify({
				name: formValues.name,
				phone: formValues.phone,
				email: formValues.email
			}), headers: { 'Content-Type': 'application/json' }
		})
			.then(async res => {
				return { res, json: await res.json()}
			})
			.then(res => {
				console.log(res.res.status, res.json)
			})
	}
</script>

<div class='grid grid-cols-1 md:grid-cols-2 gap-5 text-white'>
	<div class='bg-db-blue-light px-4 py-8'>
		<p>{ gift.name }</p>
		<p>{ gift.childName } ({ gift.childAge}let)</p>
	</div>
	{#if !gift.taken}
		<div class='bg-db-brown-light px-4 py-8'>
			<form on:submit|preventDefault={ register } class='flex flex-col gap-2'>
				<input class={`${ errors.name ? 'invalid' : ''}`} bind:value={formValues.name} on:input={validate} placeholder='Jmeno'>
				<input class={`${ errors.phone ? 'invalid' : ''}`} bind:value={formValues.phone} on:input={validate} placeholder='Telefon'>
				<input class={`${ errors.email ? 'invalid' : ''}`} bind:value={formValues.email} on:input={validate} placeholder='Email'>
				<button type="submit">Registrovat</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.invalid {
			@apply border-red-600;
	}
</style>
