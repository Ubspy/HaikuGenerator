//The wiki page for the Bee Movie in a string
var inputText = ("A honey bee named Barry Benson has recently graduated from college and is about to enter the hive's Honex Industries honey making workforce "
+	"alongside his best friend Adam Flayman. Barry is initially excited to join the workforce, but his courageous, non-conformist attitude emerges upon discovering "
+   "that his choice of job will never change once picked. Later, the two bees run into a group of Pollen Jocks, bees who collect pollen from flowers outside the "
+	"hive. The Jocks offer to take Barry outside the hive to a flower patch, and he accepts. While on his first pollen gathering expedition in New York City, "
+	"Barry gets lost in the rain, and ends up on the balcony of a human florist named Vanessa. Upon noticing Barry, Vanessa's boyfriend Ken attempts to squash him, "
+	"but Vanessa gently catches and releases Barry outside the window, saving his life. "
+	"Barry later returns to express his gratitude to Vanessa, breaking the sacred rule that bees are not supposed to communicate with humans. Barry and Vanessa "
+	"develop a close bond, bordering on attraction, and spend time together frequently. Later, while Barry and Vanessa are walking through a grocery store, Barry "
+	"is terrified to discover that the humans have been stealing and eating the bees honey for centuries. He decides to journey to Honey Farms, which supplies the "
+	"grocery store with its honey. Furious at the poor treatment of the bees in the hive, including the use of bee smokers to subdue the colony, Barry decides to "
+	"sue the human race to put an end to the exploitation of bees."
+	"Barry's mission attracts wide attention from bees and humans alike, and hundreds of people show up to watch the trial. Although Barry is up against tough "
+	"defense attorney Layton Montgomery the trial's first day goes well. That evening, Barry is having dinner with Vanessa when Ken shows up. Vanessa leaves the "
+	"room, and Ken expresses to Barry that he hates the pair spending time together. When Barry leaves to use the restroom, Ken ambushes Barry and attempts to kill "
+	"him, only for Vanessa to intervene and break up with Ken. The next day at the trial, Montgomery taunts the bees, which causes Adam to sting him. Adam's actions "
+	"jeopardize the bees credibility and put his life in danger, though he manages to survive. While visiting Adam in the hospital, Barry notices two people "
+	"smoking outside, and is struck by inspiration. The next day, Barry wins the trial by exposing the jury to the cruel treatment bees are subjected to, "
+	"particularly the smoker, and humans are banned from stealing honey from bees ever again. "
+	"Having lost the trial, Montgomery cryptically warns Barry that a negative shift in the balance of nature is imminent. As it turns out, the sudden, massive "
+	"stockpile of honey has put every bee out of a job, including the vitally important Pollen Jocks. As a result, without anything to pollinate them, the world's "
+	"flowers slowly begin to die out. Before long, the only flowers left with healthy pollen are those in a flower parade in California. Barry and Vanessa travel "
+	"to the parade and steal a parade float, which they load onto a plane to be delivered to the bees so they can re-pollinate the world's flowers. When the "
+	"plane's pilot and copilot are knocked unconscious, Vanessa is forced to land the plane, with help from Barry and the bees from Barry's hive. "
+	"Armed with the pollen of the last flowers, Barry and the Pollen Jocks manage to reverse the damage and save the world's flowers, restarting the bees honey "
+	"production. Humans and bees are seen working together, and certain brands of honey are now bee approved. Barry becomes a member of the Pollen Jocks, helping to " 
+	"pollinate the world's plants. Barry is also seen running a law firm inside Vanessa's flower shop, handling disputes between animals and humans. The film "
+	"ends with Barry flying off to a flower patch with the Pollen Jocks.");

//Proper nouns to keep capitalized
var properNouns = ["Barry", "Barry's" ,"Benson", "Honex", "Industries", "Adam", "Adam's", "Flayman", "Vanessa", "Vanessa's", "Ken", "Layton","Montgomery", "California", "New", "York", "City"];

//Array of words not to end a line with
var avoidEnding = ["and", "the", "so", "he", "to", "is", "while", "his", "that", "with", "as", "a", "are", "by", "of", "in", "its", "from", "has", "for", "be"];

//Here's a list of exceptions to the basic rules of syllable counting in our getSyllables function below
var syllableExceptions = [];
syllableExceptions["bee"] = 1;
syllableExceptions["graduated"] = 4;
syllableExceptions["the"] = 1;
syllableExceptions["hive's"] = 1;
syllableExceptions["Industries"] = 3;
syllableExceptions["Adam"] = 2;
syllableExceptions["exited"] = 3;
syllableExceptions["courageous"] = 3;
syllableExceptions["emerges"] = 3;
syllableExceptions["he"] = 1;
syllableExceptions["catches"] = 2;
syllableExceptions["releases"] = 3;
syllableExceptions["sacred"] = 2;
syllableExceptions["bees"] = 1;
syllableExceptions["supplies"] = 2;
syllableExceptions["subdue"] = 2;
syllableExceptions["sue"] = 1;
syllableExceptions["people"] = 2;
syllableExceptions["trial"] = 2;
syllableExceptions["trials"] = 2;
syllableExceptions["Montgomery"] = 3;
syllableExceptions["trial's"] = 2;
syllableExceptions["goes"] = 1;
syllableExceptions["evening"] = 2;
syllableExceptions["expresses"] = 3;
syllableExceptions["ambushes"] = 3;
syllableExceptions["causes"] = 2;
syllableExceptions["Adam's"] = 2;
syllableExceptions["manages"] = 3;
syllableExceptions["notices"] = 3;
syllableExceptions["subjected"] = 3;
syllableExceptions["cryptically"] = 3;
syllableExceptions["die"] = 1;
syllableExceptions["plane's"] = 1;
syllableExceptions["unconscious"] = 3;
syllableExceptions["terrified"] = 3;
syllableExceptions["attractions"] = 3;

//Stores if the last character was a vowel
var lastVowel = false;

//These string will store out lines for our haiku
var firstLine = "";
var secondLine = "";
var thirdLine = "";

//Size of ngrams
var order = 7;

//Empty object for ngrams
var ngrams = {}; 

function generatePoem()
{
	//Generates lines with proper syllable counts
	firstLine = generateLine(5);
	secondLine = generateLine(7);
	thirdLine = generateLine(5);

	//Puts the finished lines into the html page
	document.getElementById("line1").innerHTML = capitalize(firstLine);
	document.getElementById("line2").innerHTML = capitalize(secondLine);
	document.getElementById("line3").innerHTML = capitalize(thirdLine);
}

function createNgrams()
{
	//Loops through characters in the inputText
	for(var i = 0; i < inputText.length - 1; i++)
	{
		var gram = inputText.substring(i, i + order); //Gets substring

		//Tests if the substring already exists in the array
		if(!ngrams[gram]) 
		{
			//If not, add it to the array as an empty array
			ngrams[gram] = [];
		}

		//If it's already there, add the character after the substring as a possibility		
		ngrams[gram].push(inputText.substring(i + order, i + order + 1));
	}
}

function capitalize(word)
{
	//Returns the first letter capitalized, and the rest of the string together
	return word.charAt(0).toUpperCase() + word.substring(1, word.length);
}

function findStartingIndex()
{
	//Creates an emprty array to store all indexes that contain a space in inputText
	var endSentencesIndexs = [];

	//Finds all indexes that contain a space
	for(var i = 0; i < inputText.length; i++)
	{
		if(i == 0 || inputText[i] == '.')
		{
			//If the current index contains a space add it to the array
			endSentencesIndexs.push(i);
		}
	}

	//Gets a random index with a space to start our poem at
	var startingIndex = endSentencesIndexs[getRandomInt(0, endSentencesIndexs.length)];

	//Returns the index after the random space index it selects, so the line doesn't start with a space
	return startingIndex + 2;
}

function getLineLength(syllableCount)
{
	//Returns a random character length depending on how many syllables are supposed to be in the line
	return syllableCount = 5 ? getRandomInt(5, 30) : getRandomInt(20, 50);
}

function generateLine(expectedSyllables)
{
	//Gets a random starting index to start generating a line
	var startIndex = findStartingIndex();

	//Gets a random line length to generate
	var lineLength = getLineLength(syllableCount);
	var syllableCount = 0;

	//Gets the starting ngram
	var currentGram = inputText.substring(startIndex, startIndex + order);

	//Sets the final string to start with said ngram
	var result = currentGram;

	for(var i = 0; i < lineLength; i++)
	{
		//Gets the array of possible characters that can follow the current ngram
		var possibilities = ngrams[currentGram];

		//Sees if there's any possibliities left
		if(!possibilities)
		{
			//If not, then breaks out of the for loop
			break;
		}

		//Gets a random character based off probability of that character showing up after that ngram
		var nextCharIndex = getRandomInt(0 ,(possibilities.length - 2));

		//Sets the next character to that randomly selected index
		var nextChar = ngrams[currentGram][nextCharIndex];

		//Adds that next character to the end of the string
		result += nextChar;

		//Stores the length of our result for convenience
		var len = result.length;

		//Resets the current gram for the next character generation
		currentGram = result.substring(len - order, len);
	}

	//Cleans the string of any punctuation and unnecessary capitalizaion
	result = cleanString(result);

	//Splits the final string into it's seperate words so it can count the syllables
	resultWords = result.split(" ");

	//Cycles through each word
	for(var i = 0; i < resultWords.length; i++)
	{
		//Adds the syllable count
		syllableCount += getSyllables(resultWords[i]);
	}

	//If the syllable count isn't what's needed, recursivley call generateLine to get a new one in hopes of having the right syllable count
	if(syllableCount != expectedSyllables)
	{
		result = generateLine(expectedSyllables);
	}

	if(!checkEnding(result))
	{
		result = generateLine(expectedSyllables);
	}
	
	if(!checkString(result))
	{
		result = generateLine(expectedSyllables);
	}

	return result;
}

function getSyllables(word)
{
	//Empty syllable count variable
	var syllables = 0;

	//Sees if the word is one of the exceptions
	if(syllableExceptions[word] > -1)
	{
		//If so just get the syllable count stated above
		syllables = syllableExceptions[word];
	}
	else
	{
		//Sets the lastVowel to false to start off the word
		lastVowel = false;

		//Cycles through each letter of the input word
		for(var i = 0; i < word.length; i++)
		{
			//If the current char is a vowel, and that last one isn't, add a syllable
			if(isVowel(word[i]) && !lastVowel)
			{
				syllables++;
				lastVowel = true;
			}
			else
			{
				lastVowel = false;
			}
		}

		//Stores the length to use in arrays for covenience
		var wordLength = word.length - 1;

		//Tests for common silent endings
		if(word[wordLength] == "e")
		{
			syllables--;
		}
		else if(word[wordLength - 1] == "e" && word[wordLength] == "s")
		{
			syllables--;
		}
		else if(word[wordLength - 1] == "e" && word[wordLength] == "d")
		{
			syllables--;
		}
	}

	return syllables;
}

function cleanString(toClean)
{
	//Splits the regular string into an array of words
	toFixCapitals = toClean.split(" ");

	//Clears toClean string
	toClean = "";

	//Loops through every word
	for(var i = 0; i < toFixCapitals.length; i++)
	{
		//This will run if the srting toClean isn't in the array
		if(properNouns.indexOf(toFixCapitals[i]) < 0)
		{
			//Sets the word to lowercase
			toFixCapitals[i] = toFixCapitals[i].toLowerCase();

			//Removes special characters
			toFixCapitals[i] = toFixCapitals[i].replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
		}
	}

	//Adds the lowercase chars to the final string
	for(var i = 0; i < toFixCapitals.length; i++)
	{
		toClean += toFixCapitals[i];
		
		if(i != toFixCapitals.length - 1)
		{
			toClean += " ";
		}
	}
	
	//Removes the space at the end of the string, and keeps removing characters until it hits a space to remove extra, incomplete words
	while(toClean[toClean.length - 1] != " " && toClean.length > 5)
	{
		toClean = toClean.substring(0, toClean.length - 1);	
	}


	return toClean;
}

function checkEnding(line)
{
	//Splits the line into words
	var words = line.split(" ");

	//Checks the last word, and sees if it's an appropriate word to end on
	if(avoidEnding.includes(words[words.length - 2]) || properNouns.includes(words[words.length - 2]))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function isVowel(char)
{
	if(char == "a" || char == "e" || char == "i" || char == "o" || char == "u" || char == "y")
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkString(line)
{
	var words = line.split(" ");
	
	if(hasDuplicates(words))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function hasDuplicates(array)
{
    return (new Set(array)).size !== array.length;
}

function getRandomInt(min, max)
{
	return Math.round(Math.random() * (max - min + 1)) + min;
}
