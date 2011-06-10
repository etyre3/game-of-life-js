
/**
 * @function: resetTable ()
 * @description: resets table - sets every TD to 'dead' class
 */
function resetTable ()
{
	var cells = document.getElementsByTagName('td');
	var len = cells.length;

	var i = 0;

	for( i = 0; i < len; i++ )
	{
		if ( hasClass( cells[i], 'alive' ) )
		{
			removeClass( cells[i], 'alive' );
			addClass( cells[i], 'dead' );
		}
		if ( hasClass( cells[i], 'neighbour' ) )
		{
			removeClass( cells[i], 'neighbour' );
			addClass( cells[i], 'dead' );
		}
		else
		{
			addClass( cells[i], 'dead' );
		}
	}	
}

/**
 * @function: createTable ( array )
 * @description: creates new table based on array, which stores new states
 */
function createTable ( array )
{
	var cells = document.getElementsByTagName('td');
	var len = cells.length;
	var i = 0;
	for( i = 0; i < len; i++ )
	{
		if( array[i] == 1 )
		{
			if ( hasClass( cells[i], 'dead' ) )
			{
				removeClass( cells[i], 'dead' );
				addClass( cells[i], 'alive' );
			}
		}
		else
		{
			if ( hasClass( cells[i], 'alive' ) )
			{
				removeClass( cells[i], 'alive' );
				addClass( cells[i], 'dead' );
			}
		}
	}	
}

/**
 * @function: customSelect ()
 * @description: allow user to custom select or unselect cells
 */
function customSelect ()
{
	var element = this;
	if( hasClass( element, 'dead' ) )
	{
		removeClass( element, 'dead' );
		addClass( element, 'alive' );
	}
	else if( hasClass( element, 'alive' ) )
	{
		removeClass( element, 'alive' );
		addClass( element, 'dead' );
	}
	else if( hasClass( element, 'neighbour' ) )
	{
		removeClass( element, 'neighbour' );
		addClass( element, 'alive' );
	}
}

/**
 * @function: addActions ()
 * @description: adds action to elements
 */
function addActions ()
{
	var step = document.getElementById( 'step' );
	var reset = document.getElementById( 'reset' );
	var neighbours = document.getElementById( 'select-neighbours' );
	var cells = document.getElementsByTagName( 'td' );
	var len = cells.length;

	addEventSimple( step, 'click', nextStep );
	addEventSimple( reset, 'click', resetGame );
	addEventSimple( neighbours, 'click', selectAllNeighbours );

	for ( i = 0; i < len; i++ )
	{
		addEventSimple( cells[i], 'click', customSelect );
	}
}

/**
 * @function: resetGame ()
 * @description: resets table and selects random cells
 */
function resetGame ()
{
	resetTable();
	randomSelect( 50 );
}

/**
 * @function: randomSelect ( num )
 * @description: randomly selects <num> cells in table
 */
function randomSelect ( num )
{
	var randomNumber = 0;
	var i = 0;
	var cell;

	for( i = 0; i < num; i++ )
	{
		randomNumber = Math.floor( Math.random() * 441 );
		cell = document.getElementById( randomNumber );
		removeClass( cell, 'dead' )
		addClass( cell, 'alive' )
	}
}

/**
 * @function: nextStep ()
 * @description: determine game's new state
 */
function nextStep ()
{
	var cells = document.getElementsByTagName('td');
	var len = cells.length;
	var i = 0;
	var n = 21;
	var id;
	var newStateArray = new Array();

	for( i = 0; i < len; i++ )
	{
		id = cells[i].getAttribute('id');
		//selectNeighbours( parseInt( id ), n );
		newStateArray[i] = nextState( parseInt( id ), n );
	}
	createTable ( newStateArray );
}

/**
 * @function: selectAllNeighbours ()
 * @description: selects neighbours of all alive cells in table
 */
function selectAllNeighbours ()
{

	var aliveCells = getElementsByClass( 'alive' );
	var len = aliveCells.length;
	var i = 0;

	for( i = 0; i < len; i++ )
	{
		selectNeighbours( parseInt(aliveCells[i].getAttribute('id')), 21 );
	}
}

/**
 * @function: selectNeighbours ( id, n )
 * @description: selects all neighbours of cell with ID == id; n is a number of rows (it's required to find out neighbours positions)
 */
function selectNeighbours ( id, n )
{
	var i = 0;
	var n1, n2, n3, n4, n5, n6, n7, n8;
	n1 = id+1; // MR
	n2 = id-1; // ML
	n3 = id+n+1; // BR
	n4 = id+n; // BC
	n5 = id+n-1; // BL
	n6 = id-n+1; // TR
	n7 = id-n; // TC
	n8 = id-n-1; // TL

	// array with neighbours of element with given ID
	var cells = new Array();
	cells[0] = document.getElementById( n1 );
	cells[1] = document.getElementById( n2 );
	cells[2] = document.getElementById( n3 );
	cells[3] = document.getElementById( n4 );
	cells[4] = document.getElementById( n5 );
	cells[5] = document.getElementById( n6 );
	cells[6] = document.getElementById( n7 );
	cells[7] = document.getElementById( n8 );

	for( i = 0; i < 8; i++ )
	{
		if ( id % n == 0 || id % n == 20 )
		{
			if ( id % n == 0 )
			{
				//first cell in row
				cells[1] = cells[4] = cells[7] = null;
			}
			if( id % n == 20)
			{
				//last cell in row
				cells[0] = cells[2] = cells[5] = null;
			}
		}

		if( cells[i] == null )
		{
			continue;
		}
		
		if ( hasClass( cells[i], 'dead' ) )
		{
			// neighbour is dead
			removeClass( cells[i], 'dead' );
			addClass( cells[i], 'neighbour' );
		}
		else if ( hasClass( cells[i], 'alive' ) )
		{
			// neighbour is alive
			//removeClass( cells[i], 'alive' );
			//addClass( cells[i], 'neighbour' );
		}
	}
}

/**
 * @function: nextState ( id, n )
 * @description: determine next state of single cell with ID == id; n is required to find out neighbours positions
 */
function nextState ( id, n )
{
	var i = 0;
	var n1, n2, n3, n4, n5, n6, n7, n8;
	n1 = id+1; // MR
	n2 = id-1; // ML
	n3 = id+n+1; // BR
	n4 = id+n; // BC
	n5 = id+n-1; // BL
	n6 = id-n+1; // TR
	n7 = id-n; // TC
	n8 = id-n-1; // TL

	// array with neighbours of element with given ID
	var cells = new Array();
	cells[0] = document.getElementById( n1 );
	cells[1] = document.getElementById( n2 );
	cells[2] = document.getElementById( n3 );
	cells[3] = document.getElementById( n4 );
	cells[4] = document.getElementById( n5 );
	cells[5] = document.getElementById( n6 );
	cells[6] = document.getElementById( n7 );
	cells[7] = document.getElementById( n8 );

	var mainCell = document.getElementById( id );
	var alive = 0;
	var dead = 0;

	for( i = 0; i < 8; i++ )
	{
		if ( id % n == 0 || id % n == 20 )
		{
			if ( id % n == 0 )
			{
				//first cell in row
				cells[1] = cells[4] = cells[7] = null;
			}
			if( id % n == 20)
			{
				//last cell in row
				cells[0] = cells[2] = cells[5] = null;
			}
		}

		if( cells[i] == null )
		{
			continue;
		}
		
		if ( hasClass( cells[i], 'dead' ) )
		{
			// neighbour is dead
			dead++;
		}
		if ( hasClass( cells[i], 'alive' ) )
		{
			// neighbour is alive
			alive++;
		}
		if ( hasClass( cells[i], 'neighbour' ) )
		{
			removeClass( cells[i], 'neighbour' );
			addClass( cells[i], 'dead' );
			//alive++;
		}
	}

	if ( hasClass( mainCell, 'alive' ) )
	{
		// given cell is alive
		if ( alive == 2 || alive == 3 )
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	else
	{
		// given cell is dead
		if ( alive == 3 )
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
}

