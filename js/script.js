var app = new Vue(
    {
        el: '#root',
        data: {
            userSearchMovie:'',
            movie: []
        },
        methods: {
            searchMovie() {
                // se l'utente non inserisce un titolo, si entra nell if che genera l'url in base al parametro inserito dALL'utente
                if(this.userSearchMovie.length > 0) {
                    axios
                        .get('https://api.themoviedb.org/3/search/movie', {
                            params: {
                                api_key: '798b76e741cadd5b5e4522e8b5e11d28',
                                query: this.userSearchMovie,
                                language: 'it-IT'
                            }
                        })
                        .then((response) => {
                            const result = response.data.results;
                            this.movie = result;

                            this.movie.forEach((movie) => {
                                console.log(movie.title);
                                console.log(movie.original_title);
                                console.log(movie.original_language);
                                console.log(movie.vote_average);
                            });
                        });
                    
                    this.userSearchMovie='';
                }
            }
        },
        mounted() {
            axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=798b76e741cadd5b5e4522e8b5e11d28&query=the prestige&language=it-IT')
                .then((response) => {
                    const result = response.data.results;
                    this.movie = result;
                    console.log(this.movie);
                    console.log(this.movie[0].title);
                    console.log(this.movie[0].original_title);
                    console.log(this.movie[0].original_language);
                    console.log(this.movie[0].vote_average);

                    
                });
        }
    }
);