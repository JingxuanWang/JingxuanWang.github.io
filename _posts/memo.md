
MySQL
=====

Create Table/Alter Table这类的SQL语句是会触发隐式commit的。
一旦执行，便自动会形成一个事务。所以不可以rollback。

尤其注意，在前一个alter table类语句未完成时，不要去执行下一个这样的语句。
当然其他数据库如Oracle/SQL Server/PostgreSQL是可以rollback的。
[可以参考这里](#http://stackoverflow.com/questions/4692690/is-it-possible-to-roll-back-create-table-and-alter-table-statements-in-major-sql)

上次的教训是：

执行drop databse，接着执行create table（没有执行完），执行了drop database，再执行create table
因为drop快，create慢，因此第二次drop没有drop掉第一次create的所有内容。
导致第二次create的时候会出现重复创建的问题。


preload
=======

#### 无法启动 ####

原因是因为加入了nytprof.conf并且在文件中没有正确配置。
加了注释"#"，其实是无效的，所以程序读配置的时候挂掉了导致了变为defunct状态。


#### preload一直重启 ####

内存不够了，可以看/service/index_smart.fcgi-ext/log/main/current。
上边写了fcgi脚本启动时的log。

#### 其他配置问题 #### 

/home/game/conf/httpd.conf.dev中 注意要注掉这一块

	16 <IfDefine !FASTCGI_EXT_SERVER>
	17 #FastCgiServer /home/game/fcgi/index.fcgi           -processes 2
	18 #FastCgiServer /home/game/fcgi/index_api.fcgi       -processes 2
	19 #FastCgiServer /home/game/fcgi/qrcode.fcgi          -processes 2
	20 #FastCgiServer /home/game/fcgi/index_smart.fcgi     -processes 2
	21 #FastCgiServer /home/game/fcgi/index_mocha_api.fcgi -processes 2
	22 </IfDefine>

apachectl 实际上使用的是 svc + httpd

svc -dx /service/index.* 可以杀掉正在启动的service
svc -du 是重启，用法可以参见/usr/sbin/apachectl
	(-d down -u up)

svc 启动的时候会去读取 /service/底下的所有.fcgi-ext的service
因此想要禁掉的话需要重命名

Unity WWW Streaming AudioClip
=============================


using UnityEngine;
using System.Collections;

public class StreamListener : MonoBehaviour
{
	[SerializeField]
	private string source = "http://games-dendy.com/music/contra.mp3";

	// Use this for initialization
	void Start()
	{
		StartCoroutine("DownloadAndPlay");
	}

	IEnumerator DownloadAndPlay()
	{
		Debug.Log("Getting " + source + " ... Please wait");

		yield return new WaitForSeconds(1.5f);

		WWW www = new WWW(source);

		Debug.Log("Downloading : " + www.progress);
		while (www.progress < 0.01f)
		{
			Debug.Log("Downloading : " + www.progress);
			yield return new WaitForSeconds(0.1f);
		}
		Debug.Log("Downloading : " + www.progress);

		if (www.error == null)
		{
			audio.clip = www.GetAudioClip(false, true);
			audio.loop = false;
			audio.Play();

			Debug.Log("Clip Length : " + audio.clip.length);
		}
		else
		{
			Debug.Log("Error : " + www.error);
		}

		Debug.Log("Stop Download and wait for 5 seconds");
		www.Dispose();

		return false;
	}
}

