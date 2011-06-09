function resetTable ()
{
	//var table = document.getElementById('game-table');
	var cells = document.getElementsByTagName('td');
	var len = cells.length;

	var i = 0;

	for( i = 0; i < len; i++ )
	{
		addClass( cells[i], 'dead' );
	}	
}

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

function addActions ()
{
	var step = document.getElementById( 'step' );
	addEventSimple( step, 'click', nextStep );
}

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

function nextStep ()
{
	//var aliveCells = getElementsByClass( 'alive' );
	//var len = aliveCells.length;
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

// n - > number of rows
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
			removeClass( cells[i], 'alive' );
			addClass( cells[i], 'neighbour' );
		}
	}
}

/**************************************************************************/
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
			//removeClass( cells[i], 'dead' );
			//addClass( cells[i], 'neighbour' );
			dead++;
		}
		else if ( hasClass( cells[i], 'alive' ) )
		{
			// neighbour is alive
			//removeClass( cells[i], 'alive' );
			//addClass( cells[i], 'neighbour' );
			alive++;
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

