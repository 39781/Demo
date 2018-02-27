
var responses = {};

responses.quickReplies  = function(appHandler){		
	appHandler.ask(appHandler.buildRichResponse()
		.addSimpleResponse({
			speech: 'quickReplies demo, Please select one option',
			displayText: 'quickReplies demo, Please select one option'
		})
		.addSuggestions(['demo1','demo2'])
		.addSuggestionLink('Suggestion Link', 'https://assistant.google.com/')
	);
	  //console.log('hari');
	return true;
}
responses.simpleResponse = function (appHandler){	
	appHandler.ask({
		speech: 'Demo simple response',
		displayText: 'demo simple response'
	});	
	return true;
}
responses.basicCard = function(appHandler){	
	appHandler,ask(appHandler.buildRichResponse()
		// Create a basic card and add it to the rich response
		.addSimpleResponse('Basic Card Demo')
		.addBasicCard(app.buildBasicCard('this is simple basic card demo')
		  .setTitle('Basic Card')
		  .addButton('Demo1', 'Demo1')
		  .addButton('Demo2', 'Demo2')
		  .setImage('https://raw.githubusercontent.com/39781/incidentMG/master/images/incidentMG.jpg', 'card demo')
		  .setImageDisplay('CROPPED')
		)	
	);	
	return true;
}
responses.list = function(appHandler){				
	appHandler.askWithList('list demo',
		app.buildList('Things to learn about')
		  // Add the first item to the list
		  .addItems(app.buildOptionItem('MATH_AND_PRIME',
			['math', 'math and prime', 'prime numbers', 'prime'])
			.setTitle('Math & prime numbers')
			.setDescription('42 is an abundant number because the sum of its ' +
			'proper divisors 54 is greater…')
			.setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
		  // Add the second item to the list
		  .addItems(app.buildOptionItem('EGYPT',
			['religion', 'egpyt', 'ancient egyptian'])
			.setTitle('Ancient Egyptian religion')
			.setDescription('42 gods who ruled on the fate of the dead in the ' +
			'afterworld. Throughout the under…')
			.setImage('http://example.com/egypt', 'Egypt')
		  )
		  // Add third item to the list
		  .addItems(app.buildOptionItem('RECIPES',
			['recipes', 'recipe', '42 recipes'])
			.setTitle('42 recipes with 42 ingredients')
			.setDescription('Here\'s a beautifully simple recipe that\'s full ' +
			'of flavor! All you need is some ginger and…')
			.setImage('http://example.com/recipe', 'Recipe')
		  )
	);
	return true;
}	
responses.image = function(appHandler){
	appHandler,ask(appHandler.buildRichResponse()
		// Create a basic card and add it to the rich response
		.addSimpleResponse('Image Demo')
		.addBasicCard(app.buildBasicCard('this is simple image demo')
		  .setTitle('image Card')		  
		  .setImage('https://raw.githubusercontent.com/39781/incidentMG/master/images/incidentMG.jpg', 'card demo')
		  .setImageDisplay('CROPPED')
		)	
	);				
}

responses.carousel = function(appHandler){
	appHandler.askWithCarousel('Carousel Demo',
    // Build a carousel
    appHandler.buildCarousel()
    // Add the first item to the carousel
    .addItems(appHandler.buildOptionItem('MATH_AND_PRIME',
      ['math', 'math and prime', 'prime numbers', 'prime'])
      .setTitle('Math & prime numbers')
      .setDescription('42 is an abundant number because the sum of its ' +
        'proper divisors 54 is greater…')
      .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
    // Add the second item to the carousel
    .addItems(appHandler.buildOptionItem('EGYPT',
      ['religion', 'egpyt', 'ancient egyptian'])
      .setTitle('Ancient Egyptian religion')
      .setDescription('42 gods who ruled on the fate of the dead in the ' +
        'afterworld. Throughout the under…')
      .setImage('http://example.com/egypt', 'Egypt')
    )
    // Add third item to the carousel
    .addItems(appHandler.buildOptionItem('RECIPES',
      ['recipes', 'recipe', '42 recipes'])
      .setTitle('42 recipes with 42 ingredients')
      .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
        'of flavor! All you need is some ginger and…')
      .setImage('http://example.com/recipe', 'Recipe')
    )
  );
  return true;
}


module.exports = responses;