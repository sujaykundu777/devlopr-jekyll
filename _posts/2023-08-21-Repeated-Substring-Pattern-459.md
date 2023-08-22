---
layout: post
title:  "459 - Repeated Substring Pattern"
summary: "A LeetCode Solution"
author: tello-
date: '2023-08-21 15:00:00 -0700'
category: leetcode
thumbnail: /assets/img/office.png
keywords: cpp c++ leetcode leetcode-solution leetcode-459
permalink: /blog/leetcode-459
usemathjax: true
---

<h1><center> !!WARNING!!</center> </h1>

<center>
<h2> The following document contains my solution for leetcode challenge 459: Repeated Substring Pattern.</h2></center>

<p>By reading past this point, you are acknowledging 1 of 3 things:

1) You have already solved the challenge on your own.
2) You are trying to cheat.
3) You have no intention of ever solving the challenge.</p>

<h4><center>Please make your choice before continuing forward...</center></h4>


---

<br/>

<h1>459. Repeated Substring Pattern</h1>



<h3>Challenge</h3>

<blockquote>
<p>Given a string <code>s</code>, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.</p>

<p><strong>Example 1</strong></p>

<pre><code>Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.
</code></pre>

<p><strong>Example 2</strong></p>

<pre><code>Input: s = "aba"
Output: false
</code></pre>

<p><strong>Example 3:</strong></p>

<pre><code>Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" four times or the substring "abcabc" twice.
</code></pre>

<p><strong>Constraints:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</blockquote>

---

<h3>Initial Approach</h3>

<p>I have a few initial routes of approach on this challenge I am considering.</p>
<ul>
<li>Regex
	<ul>
	<li>Easy to match patterns</li>
	<li>Overly complex for the level of challenge</li>
	</ul>
</li>
<li>Recursion</li>
	<ul>
	<li>This problem seems perfect for a recursive approach:</li>
		<ul>
		<li>The challenge can be broken into smaller, similar micro-tasks</li>
		<li>Each recursive call would handle its smaller micro-task</li>
		</ul>
		<li>Base case</li>
			<ul>
			<li>No more characters to build the current sub-string with</li>
			<li>Solution found (the challenge is only concerned with existence not index)</li>
			</ul>
	</ul>
<li>For-Loop Nesting
	<ul>
	<li>This is often the easiest to initially come up with.</li>
	<li>Elementary skillset involved</li>
	<li>However, bad for time complexity usually.
		<ul>
		<li>For-Loops are O(N^2)</li>
		</ul>
	</li>
</ul>

---

<h3>Submission</h3>

<pre><code>#include &lt;string&gt;
#include &lt;iostream&gt;

class Solution {
public:
     bool repeatedSubstringPattern(std::string s) {
          int sLen = int(s.length());

          // Start iterating at first character in s, stop before last
          // Explanation: full string is not a sub string solution.
          for (int i = 1; i &lt; sLen; i++) {
               
               // Only substrings of length that are factors of s are considered
               if (sLen % i == 0) {
                    std::string subQ = s.substr(0, i);           // Create a temporary substring string.
                    int factor = sLen / i;                       // Factor = How many substrings needed to make whole string. s.length / sub.length
                    std::string formedStr;                       // The string formed from appending factor amount of substrings together.

                    for (int j = 0; j &lt; factor; j++) {
                         formedStr += subQ;                      // Building the formed string.
                    }

                    if (formedStr == s) {                        // Test for solution.
                         return true;                            // Solution Found.
                    }
               }
          }

          return false;                                          // Solution not found.
     }
};



int main()
{
     Solution sol;
     

     if (sol.repeatedSubstringPattern("abab") == true) std::cout &lt;&lt; "Test 1 Solution Found!" &lt;&lt; std::endl;
     else std::cout &lt;&lt; "Test 1 Solution not found!" &lt;&lt; std::endl;
     if (sol.repeatedSubstringPattern("aba") == true) std::cout &lt;&lt; "Test 2 Solution Found!" &lt;&lt; std::endl;
     else std::cout &lt;&lt; "Test 2 Solution not found!" &lt;&lt; std::endl;
     if (sol.repeatedSubstringPattern("abcabcabcabc") == true) std::cout &lt;&lt; "Test 3 Solution Found!" &lt;&lt; std::endl;
     else std::cout &lt;&lt; "Test 3 Solution not found!" &lt;&lt; std::endl;

     if (sol.repeatedSubstringPattern("bb") == true) std::cout &lt;&lt; "Test 5 Solution Found!" &lt;&lt; std::endl;
     else std::cout &lt;&lt; "Test 5 Solution not found!" &lt;&lt; std::endl;

     

     return 0;
}
</code></pre>


---

<h3>Result</h3>

<img src="../assets/img/posts/leetcode/repeatedsubstringmatching_leetcode_459_stats.png" alt="Stats">

<p>I went with the brain-easy solution as my initial submission (nested for-loop). This is of course not the most elegant way to solve the problem, but I often go with the straightforward approach first, then optimize in subsequent iterations.</p>

<h3>My solution in pseudo-code:</h3>

<ol>
<li>Note <code>s.length</code></li>
<li>Start iterating at first character in <code>s</code> with length <code>i</code>.</li>
<li>Check if substring length <code>i</code> is a factor of the length of the full string <code>s</code>.
	<ol>
	<li><code>s.length % i == 0</code></li>
	</ol>
</li>
<li>Create a temporary substring variable for our target substring <code>subQ</code>.
	<ol>
	<li>Note: substring is built each iteration with <code>[0,i]</code> where 0 is start of string, <code>i</code> is length as previously mentioned.</li>
	</ol>
</li>
<li>Calculate our <code>factor</code> which will be the multiplier we use to repeatedly append our substring when building our potential solutions.</li>
<li>Create variable for holding the working, building potential substring solution <code>formedStr</code></li>
<li>Build the formed string by appending the substring a <code>factor</code> amount of times to the end of <code>formedStr</code></li>
<li>Check if we now have a matching solution.
	<ol>
	<li>If True: Return</li>
	<li>Else back to top of loop</li>
	</ol>
</li>
<li>Repeat loop while no solution is found AND <code>i</code> &lt; <code>s.length</code></li>
<li>If loop terminates, return false, no solution found.</li>
</ol>


---

<h3>Potential Improvements</h3>

<ul>
<li>Use a less-greedy algorithm</li>
<li>Less temporary variable instantiation</li>
<li>Eliminate nested for-loops</li>
<li>Look through homework from Algorithm Design class where we solved this problem previously, for more optimizations.</li>
</ul>
