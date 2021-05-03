var app = new Vue(
    {
        el: '#root',
        data: {
            userSearchMovie:'',
            movie: [],
            userSearchTvSeries:'',
            tvSeries: [],
            imageFilm: [],
            imageTv: [],
            baseUrl: 'https://image.tmdb.org/t/p/w342/',
            voteFilm: [],
            voteTv:[]
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

                            // inserisce url immagine dentro l'array imageFilm
                            this.movie.forEach((movie) => {
                                let url= movie.poster_path;
                                this.imageFilm.push(this.baseUrl + url);

                                // converte il voto in 1 a 5 
                                let finalVote= Math.ceil(movie.vote_average / 2);
                                this.voteFilm.push(finalVote);

                                
                            });
                        });
                    
                    // modifiche 
                    this.userSearchTvSeries= this.userSearchMovie;

                    this.userSearchMovie='';
                    this.imageFilm=[];
                }
                if(this.userSearchTvSeries.length > 0) {
                    axios
                        .get('https://api.themoviedb.org/3/search/tv', {
                            params: {
                                api_key: '798b76e741cadd5b5e4522e8b5e11d28',
                                query: this.userSearchTvSeries,
                                language: 'it-IT'
                            }
                        })
                        .then((response) => {
                            const result = response.data.results;
                            this.tvSeries = result;

                            // inserisce url immagine dentro l'array imageTV
                            this.tvSeries.forEach((tvSeries) => {
                                let url= tvSeries.poster_path;
                                this.imageTv.push(this.baseUrl + url);

                                let finalVote= Math.ceil(tvSeries.vote_average / 2);
                                this.voteTv.push(finalVote);
                                // controllo
                                console.log(tvSeries.name);
                                console.log(tvSeries.original_name);
                                console.log(tvSeries.original_language);
                                console.log(tvSeries.vote_average);
                            });


                        });
                    
                    this.userSearchTvSeries='';
                    this.imageTv=[];
                }
            }
        },
        mounted() {
            // axios
            //     .get('https://api.themoviedb.org/3/search/movie?api_key=798b76e741cadd5b5e4522e8b5e11d28&query=the prestige&language=it-IT')
            //     .then((response) => {
            //         const result = response.data.results;
            //         this.movie = result;
            //         console.log(this.movie);
            //         console.log(this.movie[0].title);
            //         console.log(this.movie[0].original_title);
            //         console.log(this.movie[0].original_language);
            //         console.log(this.movie[0].vote_average);

                    
            //     });
        }
    }
);