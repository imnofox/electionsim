var electorateStatuses = {
  Northland: {
    incumbent: "nzf"
  },
  Whangarei: {
    incumbent: "national"
  },
  Rodney: {
    incumbent: "national"
  },
  Helensville: {
    incumbent: "national"
  },
  "East Coast Bays": {
    incumbent: "national"
  },
  "North Shore": {
    incumbent: "national"
  },
  "Upper Harbour": {
    incumbent: "national"
  },
  Northcote: {
    incumbent: "national"
  },
  "Te Atatū": {
    incumbent: "labour"
  },
  "Auckland Central": {
    incumbent: "national"
  },
  Tāmaki: {
    incumbent: "national"
  },
  "Mt Albert": {
    incumbent: "labour"
  },
  Epsom: {
    incumbent: "act"
  },
  Maungakiekie: {
    incumbent: "national"
  },
  Pakuranga: {
    incumbent: "national"
  },
  Kelston: {
    incumbent: "labour"
  },
  "New Lynn": {
    incumbent: "labour"
  },
  "Mt Roskill": {
    incumbent: "labour"
  },
  "Manakau East": {
    incumbent: "labour"
  },
  Botany: {
    incumbent: "national"
  },
  Māngere: {
    incumbent: "labour"
  },
  Manurewa: {
    incumbent: "labour"
  },
  Papakura: {
    incumbent: "national"
  },
  Hunua: {
    incumbent: "national"
  },
  Waikato: {
    incumbent: "national"
  },
  Coromandel: {
    incumbent: "national"
  },
  "Hamilton East": {
    incumbent: "national"
  },
  "Hamilton West": {
    incumbent: "national"
  },
  "Bay of Plenty": {
    incumbent: "national"
  },
  Tauranga: {
    incumbent: "national"
  },
  Taranaki: {
    incumbent: "national"
  },
  Taupo: {
    incumbent: "national"
  },
  "East Coast": {
    incumbent: "national"
  },
  "New Plymouth": {
    incumbent: "national"
  },
  Whanganui: {
    incumbent: "national"
  },
  Rotorua: {
    incumbent: "national"
  },
  Rangitīkei: {
    incumbent: "national"
  },
  Napier: {
    incumbent: "labour"
  },
  "Palmerston North": {
    incumbent: "labour"
  },
  Tukituki: {
    incumbent: "national"
  },
  Ōtaki: {
    incumbent: "national"
  },
  Wairarapa: {
    incumbent: "national"
  },
  Mana: {
    incumbent: "labour"
  },
  Rimutaka: {
    incumbent: "labour"
  },
  Ōhariu: {
    incumbent: "united"
  },
  "Hutt South": {
    incumbent: "labour"
  },
  "Wellington Central": {
    incumbent: "labour"
  },
  Rongotai: {
    incumbent: "labour"
  },
  Nelson: {
    incumbent: "national"
  },
  Kaikōura: {
    incumbent: "national"
  },
  Waimakariri: {
    incumbent: "national"
  },
  "West Coast-Tasman": {
    incumbent: "labour"
  },
  Selwyn: {
    incumbent: "national"
  },
  "Christchurch East": {
    incumbent: "labour"
  },
  Ilam: {
    incumbent: "national"
  },
  "Christchurch Central": {
    incumbent: "labour"
  },
  Wigram: {
    incumbent: "labour"
  },
  "Port Hills": {
    incumbent: "labour"
  },
  Rangitata: {
    incumbent: "national"
  },
  Waitaki: {
    incumbent: "national"
  },
  "Dunedin South": {
    incumbent: "labour"
  },
  "Dunedin North": {
    incumbent: "labour"
  },
  "Clutha-Southland": {
    incumbent: "national"
  },
  Invercargill: {
    incumbent: "national"
  },

  // Māori electorates
  "Te Tai Tokerau": {
    incumbent: "labour"
  },
  "Tāmaki Makaurau": {
    incumbent: "labour"
  },
  "Hauraki-Waikato": {
    incumbent: "labour"
  },
  "Ikaroa-Rāwhiti": {
    incumbent: "labour"
  },
  "Waiariki": {
    incumbent: "māori"
  },
  "Te Tai Hauāuru": {
    incumbent: "labour"
  },
  "Te Tai Tonga": {
    incumbent: "labour"
  }
};

var parties = {
  national: "National",
  labour: "Labour",
  greens: "Greens",
  nzf: "New Zealand First",
  māori: "Māori",
  act: "ACT",
  united: "United Future",
  top: "The Opportunities Party",
  conservative: "Conservatives",
  internet: "Internet Party",
  mana: "Mana Movement",
  alcp: "Aotearoa Legalise Cannabis",
  ban1080: "Ban 1080",
  social: "Democrats for Social Credit",
  peoples: "NZ People's Party"
};

var weakParties = [];

var electorateTotals = {};
var partyVoteTotals = {};
var percentagesTotals = {};

var totalMode = true;

var percentagesTotal = 0;
var numbersAddUp = false;

Handlebars.registerHelper('inArray', function(array, value, block) {
		if (_.indexOf(array, value) !== -1) {
			return block.fn(this);
		} else {
			return block.inverse(this);
		}
	});

deUrlifyData();
console.log(partyVoteTotals);

Array.prototype.forEach.call(
  document.querySelectorAll(".hexagon"),
  function(el, i) {
    var electorate = el.innerHTML;
    var partyCode = electorateStatuses[electorate].party || electorateStatuses[electorate].incumbent;
    el.setAttribute("title", electorate);
    el.setAttribute("data-id", i + 1);
    el.classList.add("party-" + partyCode);

    electorateStatuses[electorate].party = partyCode;

    if (electorateTotals.hasOwnProperty(partyCode)) {
      electorateTotals[partyCode]++;
    } else {
      electorateTotals[partyCode] = 1;
    }
});


var template = Handlebars.compile(document.querySelector("#table-row").innerText);
for (let party in parties) {
  var tr = document.createElement("tr");
  tr.innerHTML = template({party: parties[party], partyCode: party, value: totalMode ? partyVoteTotals[party] : (percentagesTotals[party] || 0)});

  var strong = (electorateTotals[party] > 0 || party == 'top' | party == 'greens');
  if (strong) {
    document.querySelector(".party-votes #strong-parties tbody").append(tr);
  } else {
    document.querySelector(".party-votes #weak-parties tbody").append(tr);
    weakParties.push(party);
  }

  partyVoteTotals[party] = partyVoteTotals[party] || 0;

  if (!electorateTotals.hasOwnProperty(party)) {
   electorateTotals[party] = 0;
  }
}
generateResults();

var tip = tippy(".hexagon", {
  position: "right",
  arrow: true,
  interactive: true,
  onShow: function() {
    var hexagon = document.querySelector("[aria-describedby=" + this.id + "]");

    var source = document.querySelector("#dropdown-template").innerText;
    var template = Handlebars.compile(source);
    var electorate = hexagon.innerText;
    var partyCode = electorateStatuses[electorate].party;

    hexagon.setAttribute(
      "title",
      template({
        id: hexagon.getAttribute("data-id"),
        electorate: hexagon.innerText,
        default: parties[partyCode],
        options: parties,
        weakParties: weakParties
      })
    );
    tip.update(this);
  }
});

document.querySelector("body").addEventListener("click", function(event) {
  var button = event.target;

  // Dropdown items
  if (
    button.tagName.toLowerCase() === "button" &&
    button.classList.contains("dropdown-item")
  ) {
    var value = button.value;
    var hexagon = document.querySelector(".active.hexagon");
    var electorate = hexagon.innerText;
    var current = electorateStatuses[electorate].party;
    hexagon.classList.remove("party-" + current);
    hexagon.classList.add("party-" + value);
    electorateStatuses[electorate].party = value;

    // Finds dropdown parent div, then finds the toggle button from there
    button.closest(".dropdown").querySelector(".dropdown-toggle").innerHTML =
      parties[value];

    electorateTotals[current]--;
    electorateTotals[value]++;

    generateResults();

    // Reset button
  } else if (
    button.tagName.toLowerCase() === "button" &&
    button.classList.contains("reset")
  ) {
    var hexagon = document.querySelector(".active.hexagon");
    var electorate = hexagon.innerText;
    hexagon.classList.remove("party-" + electorateStatuses[electorate].party);
    hexagon.classList.add("party-" + electorateStatuses[electorate].incumbent);
    electorateStatuses[electorate].party =
      electorateStatuses[electorate].incumbent;

    // Finds dropdown parent div, then finds the toggle button from there
    button.closest(".dropdown").querySelector(".dropdown-toggle").innerHTML =
      parties[electorateStatuses[electorate].incumbent];

    generateResults();
  } else if (
    button.tagName.toLowerCase() === "button" &&
    button.classList.contains("weak-toggle")
  ) {
    if (button.getAttribute("aria-expanded") == "false") {
      document.body.classList.add("weak-shown");
    } else {
      document.body.classList.remove("weak-shown");
    }
   }
});

document.querySelector("body").addEventListener("change", function(event) {
  var input = event.target;

  // Party vote inputs
  if (
    input.tagName.toLowerCase() === "input" &&
    input.classList.contains("votes-input")
  ) {
    var value = parseFloat(input.value);
    var partyCode = input.getAttribute("data-party");

    partyVoteTotals[partyCode] = value / 100 * 2410857;

    if (!totalMode) {
      percentagesTotal = 0;
      percentagesTotals[partyCode] = value;

      for (let party in percentagesTotals) {
        percentagesTotal += percentagesTotals[party];
        numbersAddUp = !(percentagesTotal > 100);
      }

      var warning = document.querySelector(".party-votes .percentage-warning");
      if (numbersAddUp) {
        warning.classList.add('hide');
      } else {
        warning.classList.remove('hide');
      }
    }

    generateResults();
  }
});

$("[name='total-votes']").bootstrapSwitch({
  state: totalMode,
  onSwitchChange: function(event, state) {
    totalMode = state;
    Array.prototype.forEach.call(
      document.querySelectorAll(".party-votes input[type='number']"),
      function(el, i) {
        if (totalMode) {
          el.removeAttribute("max");
        } else {
          el.setAttribute("max", 100);
        }
      }
    );
  }
});

function generateResults() {
  if (!totalMode && !numbersAddUp) return;
  var inputs = [];
  for (let party in parties) {
    var data = {};
    data.name = parties[party];
    data.votes = partyVoteTotals[party];
    data.electorates = electorateTotals[party] || 0;
    data.perc = percentagesTotals[party] || ((data.votes / partyVoteSum()) * 100).toFixed(2);
    inputs.push(data);
  }
  var results = sainteLague(inputs);
  console.log(results);

  document.querySelector(".results tbody").remove();
  document.querySelector(".results table").append(document.createElement("tbody"));

  var template = Handlebars.compile(document.querySelector("#results-row").innerText);
  for (let party in results) {
    /*if (totalMode) {
      var votes = +((results[party].votes / partyVoteSum()) * 100).toFixed(2);
    } else {
      var votes = +results[party].perc;
    }*/
    var votes = results[party].perc;

    var tr = document.createElement("tr");
    tr.innerHTML = template({party: results[party].name, electorates: results[party].electorates, votes: votes || 0, seats: results[party].allocated});

    if (results[party].allocated == 0 && votes < 0.5) {
      tr.classList.add("weak");
    }

    document.querySelector(".results tbody").append(tr);

  }

  urlifyData();
}

function partyVoteSum() {
  var total = 0;
  for (let party in partyVoteTotals) {
    total += partyVoteTotals[party];
  }
  return total;

}

function urlifyData() {
  var data = {
    electorates: electorateStatuses,
    votes: partyVoteTotals,
    percs: percentagesTotals,
    totalMode
  };

  var encoded = b64EncodeUnicode(JSON.stringify(data));

  if (history.pushState) {
    history.pushState(null, null, '#' + encoded);
  } else {
      location.hash = '#' + encoded;
  }
}

function deUrlifyData() {
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    var decoded = b64DecodeUnicode(hash);
    console.log(decoded);
    var data = JSON.parse(decoded);
    console.log(data);

    electorateStatuses = data.electorates;
    partyVoteTotals = data.votes; //TODO: fill fields
    percentagesTotals = data.percs || {};
    totalMode = data.totalMode;
  }
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Sainte-Laguë formula
// https://github.com/wombleton/saintelague
function sainteLague(parties, options) {
  parties = _.cloneDeep(parties);
  options = _.defaults(options, {
      seats: 120,
      threshold: 0.05,
      overhang: true,
      tagAlong: true,
      tagAlongSeats: 1
  });

  var allocated = 0,
    party,
    quotients = options.quotients || options.seats,
    seats,
    totalVotes;

  totalVotes = _.reduce(parties, function(total, party) {
    return total + party.votes;
  }, 0);

  _.each(parties, function(party) {
    party.allocated = 0;
    if ((options.tagAlong && party.electorates >= options.tagAlongSeats) || (party.votes / totalVotes) >= options.threshold) {
      party.quotient = party.votes;
    }

    // Allows a party to be excluded without messing up results.
    // Useful with early results.
    if (party.votes === -1) {
      quotients -= party.electorates;
      party.allocated = party.electorates;
    }
  });

  while (allocated < quotients) {
    party = _.maxBy(parties, 'quotient');
    party.allocated++;
    party.quotient = party.votes / ((2 * party.allocated) + 1);
    allocated++;
  }

  parties = _.map(parties, function(party) {
    if (party.electorates > party.allocated) {
      party.lists = 0;
    } else {
      party.lists = party.allocated - party.electorates;
      if (!_.isUndefined(party, 'listSize') && party.lists > party.listSize) {
        party.lists = party.listSize;
      }
    }
    if (party.electorates > party.allocated) {
      party.allocated = party.electorates;
    }

    return _.omit(party, 'quotient');
  });

  seats = _.reduce(parties, function(total, party) {
    return total + party.allocated;
  }, 0);

  // If overhang isn't allowed and overhang is detected
  // recalculate with less quotients.
  if (!options.overhang && seats > options.seats) {
    return saintLague(parties, _.assign({ quotients: ((2 * options.seats) - seats)  }, options));
  }

  return parties;
}
