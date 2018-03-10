## refs
*Objectives*
A direct eference to a Dom element.

-Managing focus, text selection, or media playback.
-Triggering Imperative animations
-Integrating with third-party DOM libs (d3)

Warning!

*It's a last option* 
Think props before ref.

ref example

    <from onSubmit={(e) => {
        e.preventDefault();
        
        //access to the form value;
        console.log(this.inputText.value);
        })>
        <input
            type="text"
            ref=={(input) => this.inputText = input}
            />
            </form>
    }
    


Example Code for Recipe Handling:
passing data to save to state in form of callback. 
    handleSave = (recipe) => {
        console.log(this.state)
        console.log(recipe)
    }
    handleSave = (recipe) => {
        const {title, ingredients, instructions, img} = recipe;
        const newRecipe = {
            id: this.state.nextRecipeId,
            title:title,
            ingredients: ingredients,
            instructions: instructions,
            img: img
        };
        this.setState(prevState => {
            return {
                nextRecipeId: prevState.nextRecipeId + 1,
                recipes: [...this.state.recipes, newRecipe]
            }
        });
    }
    
    
<Navbar />
<RecipeInput onSave={this.handleSave} />

are two siblings. Cannot share same state.
Solution: Let the parent decide. Push up to parent component.


      render() {
        //if showform is true we mount the recipe and put component to the DOM.
        //Next put callbac function to navbar for new recipe link 
        //recipe app component changes state once clicked as a higher level update.
        const {showForm} = this.state;
        return (
          
          <div className="App">
            <Navbar onNewRecipe={()=>this.setState({showForm:true})}/>
            {showForm ? <RecipeInput onSave={this.handleSave} />: null}
            <RecipeList recipes={this.state.recipes} />
          </div>
        );
      }
    }
    
    
      render() {
        //if showform is true we mount the recipe and put component to the DOM.
        //Next put callbac function to navbar for new recipe link 
        //recipe app component changes state once clicked as a higher level update.
        const {showForm} = this.state;
        return (
          
          <div className="App">
            <Navbar onNewRecipe={()=>this.setState({showForm:true})}/>
            {showForm ? 
              <RecipeInput 
                onSave={this.handleSave} 
                onClose={()=>this.setState({showForm:false})}
                />
                : null}
            <RecipeList recipes={this.state.recipes} />
          </div>
            );
            }
        }

    export default RecipeApp;
    
*This is so we can turn off form.

#### NOw we implement a delete.

        <button 
            type="button" 
            onClick={()=>onDelete(id)}
              >
              DELETE
            </button>
            
#### we want to filter by id.

Write function that returns true if ID is not equal to the ID that was passed into this func
Else, it's false.

So only returns true if id we're on is not equal to id given.

So id we pressed delete for gets taken out.

      onDelete(id) {
    const recipes = this.state.recipes.filter(r=> r.id !== id);
    this.setState({recipes})
    }
    
Without passing onDelete to RecipeList we cannot utilize button.

    static propTypes = {
      recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    
        onDelete: PropTypes.func.isRequired
      }
      
      render() {
        const {onDelete} = this.props;
        const recipes = this.props.recipes.map((r,index) => (
          <Recipe key={r.id} {...r}  onDelete={onDelete}/>
        ));
        
