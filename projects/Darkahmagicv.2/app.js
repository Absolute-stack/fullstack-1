'use strict';

const imagePrompts = [
  // REALISTIC PHOTOGRAPHY - Portraits
  'A cinematic close-up portrait of a woman in her 30s with piercing green eyes, natural freckles, and windswept auburn hair, golden hour lighting casting warm rim light on her face, shot on Canon EOS R5 with 85mm f/1.2 lens, shallow depth of field, bokeh background, photorealistic, 8k resolution',

  'Professional headshot of a confident businessman in navy suit, modern office background, soft studio lighting, sharp focus on eyes, shot with 85mm portrait lens, corporate photography style, high resolution',

  'Street portrait of an elderly jazz musician with weathered hands holding a vintage saxophone, smoky blues club atmosphere, dramatic side lighting, emotional expression, documentary photography style, black and white, film grain texture',

  'Fashion portrait of a model with avant-garde makeup, bold geometric patterns on face, studio lighting with colored gels, high fashion editorial style, dramatic pose, Vogue magazine quality, 8k detail',

  'Candid portrait of a young child laughing in a sunflower field, natural daylight, genuine emotion, shallow depth of field, warm color palette, lifestyle photography, authentic moment captured',

  // REALISTIC PHOTOGRAPHY - Landscapes
  'Breathtaking aerial view of Norwegian fjords at sunrise, dramatic mountain peaks, mirror-like water reflections, morning mist, drone photography, National Geographic style, ultra-wide angle, 8k resolution',

  'Majestic Icelandic waterfall cascading down black volcanic rocks, long exposure creating silky water effect, moody overcast sky, dramatic landscape photography, shot on medium format camera, professional color grading',

  'Golden sand dunes of Sahara desert at sunset, dramatic shadows and highlights, lone camel caravan silhouette, warm orange and purple sky, travel photography, telephoto compression, cinematic composition',

  'Misty Japanese bamboo forest with stone path leading through, dappled sunlight filtering through leaves, serene atmosphere, zen aesthetic, nature photography, shallow depth of field, peaceful composition',

  'Dramatic stormy seascape with crashing waves against rugged cliffs, dark threatening clouds, lightning in distance, long exposure photography, moody atmosphere, powerful nature scene, 8k detail',

  // REALISTIC PHOTOGRAPHY - Architecture
  'Modern minimalist white concrete house with infinity pool overlooking ocean, floor-to-ceiling glass walls, sunset lighting, architectural photography, shot with tilt-shift lens, professional real estate style, 8k ultra HD',

  'Ancient Gothic cathedral interior with soaring vaulted ceilings, stained glass windows casting colorful light patterns, dramatic architectural details, wide-angle perspective, professional architectural photography',

  'Futuristic glass skyscraper reflecting clouds and neighboring buildings, abstract architectural photography, geometric patterns, blue hour lighting, urban architecture, sharp details, 8k resolution',

  'Abandoned industrial warehouse with rusty metal beams and broken windows, shafts of dusty light, urban decay aesthetic, gritty atmosphere, urban exploration photography, dramatic shadows',

  'Traditional Japanese temple with red torii gates leading up stone steps, autumn foliage surrounding, soft morning light, architectural travel photography, cultural heritage site, vibrant colors',

  // REALISTIC PHOTOGRAPHY - Wildlife
  'Majestic male lion with full mane backlit by golden sunset on African savanna, powerful stance, dramatic wildlife photography, shot with 600mm telephoto lens, National Geographic quality, tack sharp focus',

  'Humpback whale breaching ocean surface with water spray, dramatic action shot, wildlife photography, frozen motion, blue ocean background, natural behavior, professional nature photography',

  'Colorful hummingbird hovering near exotic flower, wings frozen mid-flight, macro wildlife photography, vibrant colors, shallow depth of field, high-speed photography, intricate detail',

  'Snow leopard camouflaged among rocky mountain terrain, piercing blue eyes, winter wildlife photography, dramatic lighting, endangered species documentation, professional quality',

  'African elephant herd walking across dusty plains at sunset, silhouette composition, dramatic sky, wildlife conservation photography, emotional storytelling, cinematic atmosphere',

  // FANTASY & CONCEPT ART - Characters
  'Ethereal elven warrior princess with flowing silver hair and ornate golden armor, wielding magical staff with glowing crystal, enchanted forest background, fantasy character design, digital painting, trending on ArtStation',

  'Cyberpunk mercenary with neon-lit mechanical arm enhancements, leather jacket with glowing circuit patterns, rain-soaked Tokyo alleyway background, sci-fi character concept art, octane render, 8k detail',

  'Fierce female Viking warrior with war paint and braided hair, fur cloak and battle-worn armor, standing on snowy mountain peak, fantasy illustration style, dramatic lighting, epic composition',

  'Steampunk inventor in leather goggles and brass mechanical wings, Victorian-era workshop filled with clockwork devices, warm gaslight ambiance, detailed character design, painted in style of James Gurney',

  'Mystical witch with flowing dark robes surrounded by floating spell books and magical runes, cosmic background with swirling galaxies, fantasy art, glowing effects, highly detailed digital painting',

  // FANTASY & CONCEPT ART - Creatures
  'Majestic dragon perched on mountain peak, iridescent scales reflecting moonlight, massive wings spread wide, breathing ethereal blue flames, fantasy creature design, epic scale, photorealistic rendering',

  'Bioluminescent deep sea creature with translucent body and glowing tentacles, dark ocean depths background, alien-like appearance, creature concept art, scientific illustration style, mysterious atmosphere',

  'Ancient forest guardian spirit made of twisted tree branches and glowing moss, deer antlers crown, mystical fantasy creature, ethereal lighting, painted by Brian Froud, magical realism',

  'Mechanical phoenix made of brass gears and copper feathers, wings trailing fire and sparks, steampunk creature design, industrial fantasy aesthetic, dynamic pose, detailed metalwork',

  'Cosmic wolf with fur made of swirling nebulas and stars, celestial creature design, space theme, magical fantasy art, glowing effects, otherworldly beauty, digital masterpiece',

  // FANTASY & CONCEPT ART - Environments
  'Floating crystal city suspended among clouds at sunset, interconnected by rainbow bridges, waterfalls cascading into sky, fantasy landscape, painted by Hayao Miyazaki style, dreamlike atmosphere, vivid colors',

  'Ancient elven library carved inside massive tree trunk, spiral staircases wrapped around interior, glowing magical books floating, warm candlelight, fantasy interior design, highly detailed architecture',

  'Alien planet landscape with multiple moons in purple sky, bizarre rock formations, bioluminescent plants, otherworldly environment, sci-fi concept art, epic vista, cinematic composition',

  'Underwater mer-kingdom with coral palace and bioluminescent gardens, schools of tropical fish, shafts of sunlight piercing water, fantasy underwater scene, vibrant colors, magical atmosphere',

  'Post-apocalyptic overgrown city with nature reclaiming skyscrapers, vines and trees growing through buildings, dramatic sunset lighting, environmental concept art, detailed vegetation, haunting beauty',

  // SCI-FI & FUTURISTIC
  'Massive space station orbiting ringed planet, sleek futuristic architecture, multiple docking bays with spacecraft, stars and nebula background, hard sci-fi concept art, photorealistic rendering, 8k detail',

  'Neon-lit cyberpunk street market at night, holographic advertisements floating, street vendors with futuristic tech, crowds in high-tech fashion, blade runner aesthetic, rain-soaked streets, atmospheric lighting',

  "Interior of advanced spacecraft cockpit with holographic displays and controls, pilot's perspective overlooking alien planet through viewport, sci-fi technology design, detailed interfaces, cinematic lighting",

  'Robot uprising scene in futuristic city, mechanical beings marching through streets, dramatic lighting with explosions, dystopian atmosphere, action-packed composition, movie poster quality',

  'Terraform colony on Mars with biodomes and solar panels, red rocky landscape, Earth visible in sky, realistic space colonization concept, scientific accuracy, inspirational future vision',

  // HORROR & DARK FANTASY
  'Abandoned Victorian mansion on stormy hill, lightning illuminating broken windows, overgrown garden with twisted dead trees, Gothic horror atmosphere, ominous mood, cinematic composition, highly detailed',

  'Eldritch cosmic horror creature with impossible geometry and countless tentacles emerging from portal, Lovecraftian design, dark atmospheric lighting, terrifying scale, digital horror art',

  'Creepy porcelain doll with cracked face sitting in dusty attic, dramatic side lighting casting eerie shadows, horror photography style, unsettling atmosphere, photorealistic detail',

  'Vampire lord in ornate throne room lit by candlelight, Gothic castle interior, dramatic cape and Victorian attire, pale skin and red eyes, dark fantasy character design, cinematic lighting',

  'Haunted forest with gnarled trees forming sinister faces, fog rolling through, full moon barely visible, horror landscape, ominous atmosphere, muted color palette, professional horror illustration',

  // NATURE & WILDLIFE - Macro
  'Extreme macro photography of dewdrops on spider web at sunrise, water droplets reflecting rainbow colors, intricate web pattern, shallow depth of field, nature macro photography, 8k detail',

  'Close-up of butterfly wing showing intricate scale patterns and vibrant iridescent colors, macro nature photography, scientific detail, beautiful symmetry, studio lighting, ultra-sharp focus',

  'Macro shot of blooming flower with visible pollen and stamens, soft morning light, delicate petals with water droplets, botanical photography, shallow depth of field, vibrant natural colors',

  'Extreme close-up of honeybee collecting nectar from purple flower, compound eyes visible, golden hour lighting, nature macro photography, National Geographic style, tack sharp detail',

  'Macro photograph of colorful tree frog on tropical leaf, vibrant skin texture visible, rainforest background softly blurred, wildlife macro photography, vivid colors, professional quality',

  // FOOD PHOTOGRAPHY
  'Gourmet chocolate cake slice with molten center oozing out, garnished with fresh berries and gold leaf, dark moody food photography, dramatic lighting, shallow depth of field, restaurant quality, 8k detail',

  'Rustic Italian pasta dish with fresh tomatoes and basil, steam rising, wooden table setting with vintage cutlery, natural window light, food styling, overhead shot, appetizing composition',

  'Artisan coffee with intricate latte art being poured, cafe atmosphere, warm ambient lighting, steam visible, lifestyle food photography, Instagram-worthy aesthetic, professional barista skills',

  'Fresh sushi platter arranged on black slate with chopsticks and soy sauce, Japanese restaurant setting, clean composition, vibrant fish colors, commercial food photography, appetizing presentation',

  'Decadent dessert table spread with colorful macarons, cupcakes, and pastries, soft pastel colors, bakery setting, natural light from window, overhead flat lay, food blogger style photography',

  // AUTOMOTIVE
  'Sleek matte black sports car on winding mountain road at sunset, dramatic landscape background, automotive photography, motion blur on wheels, professional car shoot, 8k resolution, cinematic composition',

  'Vintage classic car from 1960s parked on cobblestone street, retro aesthetic, golden hour lighting, nostalgic atmosphere, automotive restoration photography, detailed chrome work, film photography style',

  'Futuristic electric hypercar with aerodynamic design in modern showroom, dramatic studio lighting highlighting curves, luxury automotive photography, reflective floor, high-end commercial quality',

  'Off-road vehicle covered in mud splashing through river crossing, action adventure photography, dramatic moment captured, rugged landscape, automotive lifestyle photography, dynamic composition',

  'Racing car speeding around track with motion blur background, panning photography technique, competitive motorsports atmosphere, sponsor logos visible, professional racing photography',

  // FASHION & EDITORIAL
  'High fashion editorial shot of model in avant-garde couture gown on urban rooftop at sunset, dramatic pose, cityscape background, Vogue magazine style, professional fashion photography, 8k detail',

  'Runway fashion show with model wearing futuristic metallic outfit, dramatic catwalk lighting, fashion week atmosphere, professional fashion photography, sharp focus, editorial quality',

  'Bohemian fashion portrait in flower field, flowing dress, natural makeup, golden hour lighting, free-spirited aesthetic, fashion editorial style, dreamy atmosphere, professional modeling shot',

  'Luxury fashion advertisement with model in designer winter coat against snowy mountain backdrop, commercial fashion photography, dramatic lighting, high-end brand aesthetic, magazine quality',

  'Street style fashion photography of trendsetter in urban setting, candid pose, graffiti wall background, contemporary fashion editorial, natural lighting, authentic city vibe, Instagram aesthetic',

  // ABSTRACT & ARTISTIC
  'Abstract fluid art with swirling metallic gold, deep blue, and purple paint, marble texture effect, luxury aesthetic, modern abstract painting, high resolution, suitable for wall art',

  'Geometric abstract composition with overlapping colorful shapes and gradients, modern minimalist design, bauhaus influence, clean lines, contemporary digital art, vibrant color palette',

  'Explosion of colorful powder paint on black background, high-speed photography, abstract color splash, dynamic movement frozen in time, artistic expression, vibrant hues, dramatic contrast',

  'Fractal mandala pattern with intricate details and symmetrical design, psychedelic colors, spiritual art aesthetic, meditative visual, digital sacred geometry, infinite complexity, 8k detail',

  'Light painting photography with long exposure trails creating abstract patterns, dark background, neon colors, experimental art photography, creative technique, mesmerizing composition',

  // HISTORICAL & CULTURAL
  "Ancient Egyptian pharaoh's tomb interior with hieroglyphic walls and golden treasures, dramatic torch lighting, archaeological discovery atmosphere, historical accuracy, cinematic composition, highly detailed",

  'Samurai warrior in traditional armor standing in bamboo forest, katana drawn, feudal Japan setting, historical character design, dramatic lighting, cultural authenticity, epic composition',

  'Renaissance painting style portrait of nobility in ornate period clothing, classical oil painting technique, chiaroscuro lighting, museum quality artwork, rich colors, masterful composition',

  'Ancient Greek temple ruins at sunrise, marble columns against blue sky, historical architecture photography, Mediterranean landscape, classical antiquity, golden hour lighting, epic scale',

  'Medieval castle courtyard with knights in armor, banners flying, stone architecture, historical reenactment scene, period-accurate details, dramatic overcast lighting, cinematic atmosphere',

  // SPACE & ASTRONOMY
  'Detailed view of spiral galaxy with colorful nebula clouds and countless stars, deep space photography style, Hubble telescope quality, cosmic beauty, scientific accuracy, 8k resolution',

  'Astronaut floating in space with Earth visible below, realistic space suit details, stars in background, inspirational space exploration scene, photorealistic rendering, dramatic lighting from sun',

  'Alien exoplanet with rings and multiple moons, viewed from space station window, sci-fi realism, detailed planetary features, cosmic vista, awe-inspiring scale, cinematic composition',

  "Solar eclipse viewed from Earth's surface with corona visible, dramatic celestial event, astronomical photography, people watching in silhouette, once-in-a-lifetime moment, professional astrophotography",

  'Colorful aurora borealis dancing over snowy mountain landscape at night, starry sky, natural phenomenon, long exposure photography, breathtaking nature scene, vibrant green and purple lights',

  // SPORTS & ACTION
  'Professional soccer player mid-kick with ball frozen in motion, stadium crowd blurred in background, dramatic sports photography, athletic peak performance, motion blur effects, cinematic lighting',

  'Surfer riding massive wave barrel, water spray creating rainbow effect, action sports photography, frozen moment, dramatic composition, professional surf photography, golden hour lighting',

  'Rock climber scaling sheer cliff face at sunset, dramatic perspective from below, extreme sports photography, determination and strength, adventure aesthetic, cinematic composition',

  'Basketball player dunking in slow-motion with dramatic lighting, sweat droplets visible, indoor arena atmosphere, professional sports photography, peak athletic moment, dynamic composition',

  'Skier carving through deep powder snow with mountain peaks background, action winter sports photography, spray of snow, dramatic lighting, adventure travel aesthetic, professional quality',

  // URBAN & STREET
  'Rainy Tokyo street at night with neon signs reflecting in puddles, crowds with umbrellas, cyberpunk aesthetic, street photography, atmospheric lighting, urban landscape, cinematic composition',

  'Graffiti-covered alley with street art murals, urban culture photography, vibrant colors, gritty city atmosphere, hip-hop aesthetic, wide-angle perspective, authentic street scene',

  'New York City skyline at blue hour with illuminated skyscrapers, cityscape photography from Brooklyn Bridge, urban landscape, long exposure light trails, professional architecture photography',

  'Empty subway station platform at night, dramatic perspective, urban solitude theme, moody atmosphere, fluorescent lighting, street photography aesthetic, cinematic composition',

  'Busy market street in Marrakech with colorful textiles and spices, vibrant cultural scene, travel photography, warm lighting, authentic atmosphere, rich colors and textures',

  // MINIMALIST & MODERN
  'Minimalist composition with single plant branch against white background, clean aesthetic, modern botanical photography, negative space, simple elegance, Scandinavian design influence',

  'Abstract minimalist architecture with geometric white concrete forms against blue sky, architectural photography, clean lines, modern design, high contrast, professional quality',

  'Single water droplet creating ripple on still water surface, minimalist nature photography, zen aesthetic, soft lighting, peaceful composition, meditative quality',

  'Minimalist product shot of luxury watch on white surface with dramatic shadow, clean commercial photography, elegant simplicity, professional lighting, high-end aesthetic',

  'Simple geometric shapes with pastel gradient colors, modern minimalist design, clean composition, contemporary digital art, soothing color palette, abstract minimalism',
];

const body = document.body;
const toggleThemeBtn = document.querySelector('.toggle-theme-btn');
const randomPromptBtn = document.querySelector('.random-prompt-btn');
const textInput = document.querySelector('.text-input');
const form = document.querySelector('.form');
const selectModel = document.querySelector('.select-model');
const aspectRatio = document.querySelector('.aspect-ratio');
const imgContainer = document.querySelector('.img-container');

document.addEventListener('click', (e) => {
  const target = e.target;
  toggleTheme(target);
  generateRandomPrompt(target);
  getUserReq(e, target);
});

function toggleTheme(target) {
  if (target.closest('.toggle-theme-btn')) {
    const isDark = body.classList.toggle('dark-theme');
    if (isDark) {
      toggleThemeBtn.innerHTML = `<span class="material-symbols-sharp symbol"> light_mode </span> `;
    } else if (!isDark) {
      toggleThemeBtn.innerHTML = `<span class="material-symbols-sharp symbol"> dark_mode </span> `;
    }
  }
}

function generateRandomPrompt(target) {
  if (target.closest('.random-prompt-btn')) {
    const randommPrompt =
      imagePrompts[Math.floor(Math.random() * imagePrompts.length)];
    textInput.value = randommPrompt;
    textInput.focus();
  }
}

textInput.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && !e.shiftkey) {
    e.preventDefault();
    form.requestSubmit();
    textInput.focus();
  }
});

function getUserReq(e, target) {
  e.preventDefault();
  if (target.closest('.generate-btn')) {
    const userText = textInput.value.trim();
    const selectedModel = selectModel.value;
    const ratio = aspectRatio.value;

    const formData = new FormData();
    formData.append('prompt', `${userText}`);
    formData.append('style', `anime`);
    formData.append('aspect_ratio', `${aspectRatio.value.replace('/', ':')}`);

    generateImg(userText, selectedModel, ratio, formData);
  }
}

function hw(r) {
  const base = 512;
  const ar = r.split('/');
  const wRatio = ar[0];
  const hRatio = ar[1];

  const height = base;
  const width = (wRatio / hRatio) * 512;
  return { height, width };
}

async function generateImg(userText, selectedModel, ratio, formData) {
  if (selectedModel === 'Vyro') {
    imgContainer.classList.add('loading');

    try {
      const url = 'https://api.vyro.ai/v2/image/generations';
      const req = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer vk-nOP8t3DNgfIbSPSrFUbxUp2Dz12ZwdQETnbFShunr2Vfzx',
        },
        body: formData,
      });

      if (!req.ok) {
        const errMsg = await req.text(); // get API error details
        throw new Error(`API Error (${req.status}): ${errMsg}`);
      }

      const blob = await req.blob();
      const res = URL.createObjectURL(blob);

      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.innerHTML = `<img src="${res}" alt="Generated Image" class="img">`;
    } catch (error) {
      console.error(error);
      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.textContent = `Error ‼️ ${error.message}`;
    }
  } else if (selectedModel === 'Rapid') {
    imgContainer.classList.add('loading');
    try {
      const url =
        'https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php';

      const req = await fetch(url, {
        method: 'POST',
        headers: {
          'x-rapidapi-key':
            '0ee910ad2bmshede14d671022d51p19915bjsn7c2401b3145e',
          'x-rapidapi-host':
            'ai-text-to-image-generator-flux-free-api.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${userText}`,
          style_id: 4,
          size: `${ratio.replace('/', '-')}`,
        }),
      });
      const data = await req.json();
      const src = data?.result?.data?.results?.[0]?.origin;
      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.innerHTML = `<img src="${src}" alt="Generated Image" class="img">`;
    } catch (error) {
      console.error(error);
      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.textContent = `Error ‼️ ${error.message}`;
    }
  } else if (selectedModel === 'Pollinations') {
    imgContainer.classList.add('loading');
    const url = `https://image.pollinations.ai/prompt/${userText}`;
    try {
      const req = await fetch(url, {
        method: 'GET',
      });
      const data = await req.blob();
      const res = URL.createObjectURL(data);
      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.innerHTML = `<img src="${res}" alt="Generated Image" class="img">`;
      console.log(data);
    } catch (error) {
      console.error(error);
      imgContainer.classList.remove('loading');
      imgContainer.classList.add('active');
      imgContainer.textContent = `Error ‼️ ${error.message}`;
    }
  }
}
