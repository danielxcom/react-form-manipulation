import React, { Component } from 'react';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';

class RecipeApp extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
      {
        id:0,
        title: "Spaghetti",
        instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
        ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg"
      },
      {
        id:1,
        title: "Milkshake",
        instructions: "Combine ice cream and milk.  Blend until creamy",
        ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
        img: "milkshake.jpg"
      },
      {
        id:2,
        title: "Avocado Toast",
        instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
        ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
        img: "avocado_toast.jpg"
      }
    ],
      nextRecipeId:3, //track next id.
      showForm: false //boolean to see who gets state.
    }
    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  
  handleSave(recipe) {
    //get object with single recipe.
    
    //update state.
    this.setState((prevState, props)=>
    {
      const newRecipe={...recipe, id: this.state.nextRecipeId};
      //will consist of all vals passed in from save invocation then the id from nextRecipeId counter.
      
      //update counter by one. mod the recipe.
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
        
      }
    })
  }
  
  onDelete(id) {
    const recipes = this.state.recipes.filter(r=> r.id !== id);
    this.setState({recipes});
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
        <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipeApp;