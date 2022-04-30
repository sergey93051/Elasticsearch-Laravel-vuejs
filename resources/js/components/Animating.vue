<template>
  <section class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <div class="card" v-for="card in cards" :key="card.id">
          <div class="card-inner" @click="simpleFade()">
            <div class="card-name">{{ card.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { gsap } from 'gsap';
  import { CSSPlugin } from 'gsap/CSSPlugin'
  gsap.registerPlugin(CSSPlugin);

  const myCards = [
    {
      id: 0,
      name: 'Prima carta',
    },
    {
      id: 1,
      name: 'Seconda carta',
    },
    {
      id: 2,
      name: 'Terza carta',
    },
    {
      id: 3,
      name: 'Quarta carta',
    }
  ];

  export default {
    name: 'TarocchiCards',
    data() {
      return {
        cards: myCards,
      };
    },
    methods: {
      simpleFade(){
        gsap.fromTo(this,{autoAlpha:1},{autoAlpha:0, duration: 0.35});
      }
    },
  }
</script>