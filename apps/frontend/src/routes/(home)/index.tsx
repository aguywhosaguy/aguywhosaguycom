import { Title } from "@solidjs/meta";

const Home = () => {
  return (
    <main class="px-20 py-30 my-20 mx-auto max-w-6xl space-y-10 bg-base-100">
      <Title>Home</Title>
      <div class="space-y-10">
        <h1 class="lg:text-5xl md:text-3xl font-bold text-base-content">aguywhosaguy.com</h1>
        <div class="space-y-3">
          <p class="text-base-content">Hello! I'm aguywhosaguy. This is the website where I'll keep all of my projects in the nearby future.</p>
          <p class="text-base-content">I'm mostly focused on web development at the moment, but I'll occasionally make a random side project here and there.</p>
          <p class="text-base-content">Check out my GitHub below to see some of the things I work on, or the <a href="https://github.com/aguywhosaguy/aguywhosaguycom-solidstart">source code for this website.</a></p>
        </div>
      </div>
      <footer class="space-y-5 flex">
        <a href="https://github.com/aguywhosaguy" class="size-px">
          <svg class="fill-base-300 hover:fill-base-content" role="img" viewBox="0 0 24 24" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        
      </footer>
    </main>
  );
}

export default Home;